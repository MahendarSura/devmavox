
export const tlsMisconfigGuide = {
  title: "TLS Misconfiguration — Production Troubleshooting Guide",
  category: "Security",
  filePath: "app/troubleshooting-center/security/TLSMisconfig.ts",
  difficulty: "Advanced",
  estimatedTime: "90–150 minutes",
  tags: [
    "TLS",
    "SSL",
    "X.509",
    "OpenSSL",
    "SNI",
    "mTLS",
    "NGINX",
    "Kubernetes",
    "Ingress",
    "cert-manager",
    "Java",
    "Truststore",
    "Load Balancer",
    "PKI",
    "Incident Response",
  ],

  overview: {
    summary:
      "A production-ready workflow for diagnosing TLS handshake failures, certificate validation errors, hostname and SNI mismatches, incomplete certificate chains, mutual TLS failures, protocol and cipher incompatibilities, certificate rotation incidents, and TLS issues across application, proxy, Kubernetes, and cloud boundaries.",
    objectives: [
      "Identify the failing TLS connection and affected traffic before making changes.",
      "Distinguish DNS, TCP, TLS handshake, certificate validation, HTTP, and upstream connectivity failures.",
      "Inspect the actual certificate served by each endpoint and compare it with the expected certificate.",
      "Validate certificate dates, SANs, issuer, chain, key usage, and certificate-to-private-key matching.",
      "Troubleshoot SNI, reverse proxies, load balancers, Kubernetes Secrets, and mTLS.",
      "Identify Java truststore, container CA bundle, client certificate, and clock-related failures.",
      "Recover safely with approved certificate or configuration changes.",
      "Build preventive monitoring, renewal automation, CI checks, and incident documentation.",
    ],
  },

  productionIncident: {
    scenario:
      "A production API was healthy earlier. After a certificate rotation or ingress/load-balancer configuration change, some clients begin reporting certificate errors or TLS handshake failures. Other clients still work, and the deployment pipeline may be healthy.",
    exampleSymptoms: [
      "curl: (60) SSL certificate problem: certificate has expired.",
      "curl: (60) SSL certificate problem: unable to get local issuer certificate.",
      "Hostname mismatch or certificate does not match the requested host.",
      "OpenSSL reports an unexpected EOF, handshake failure, or protocol alert.",
      "Java applications report SSLHandshakeException or PKIX path building failed.",
      "Ingress begins serving its default or self-signed certificate.",
      "mTLS clients receive HTTP 400, 401, 403, or a TLS handshake rejection.",
      "One load balancer IP works while another serves an old certificate.",
      "External clients work, but workloads inside the cluster fail.",
      "The browser works, but an older application runtime fails.",
    ],
    possibleBusinessImpact: [
      "API and customer login failures.",
      "Payment, webhook, or partner integrations failing.",
      "Deployment and health checks blocked.",
      "Service-to-service calls failing and retry queues growing.",
      "Increased error rate, latency, and incident response load.",
      "Potential security exposure if a certificate or TLS policy is weakened to bypass the failure.",
    ],
    severity: {
      SEV1:
        "Critical customer-facing outage, broad authentication/payment failure, suspected private-key compromise, or a security control bypass.",
      SEV2:
        "Major service degradation, important integrations failing, or significant traffic affected.",
      SEV3:
        "Limited clients, one region, one endpoint, or a noncritical environment affected.",
      SEV4:
        "A warning or configuration issue with no confirmed customer impact.",
      note:
        "Use the organization's incident policy. A suspected private-key compromise or active interception risk requires security escalation even if availability remains healthy.",
    },
  },

  safetyChecks: [
    "Confirm the exact hostname, port, protocol, environment, region, cluster, namespace, and failing client.",
    "Verify the current cloud account, Kubernetes context, repository, and deployment revision before running any change command.",
    "Establish whether TLS terminates at a CDN, WAF, cloud load balancer, ingress controller, service mesh, or application.",
    "Separate public-facing TLS from upstream TLS; a valid frontend certificate does not prove the backend connection is valid.",
    "Capture the current certificate metadata, listener configuration, Secret metadata, and recent change history before modifying anything.",
    "Check incident approval requirements and identify the service owner, security contact, and rollback decision-maker.",
    "Never paste private keys, passwords, bearer tokens, client private keys, or unredacted production secrets into tickets or chat.",
    "Do not disable certificate verification, hostname verification, mTLS, or security policies to make a failing health check pass.",
    "Do not downgrade TLS versions or re-enable obsolete protocols and weak ciphers as a quick fix.",
    "Avoid printing Kubernetes Secret data or full environment variables into shared CI logs.",
    "Do not restart every proxy or application replica simultaneously; use the approved rolling or failover strategy.",
    "If key compromise is suspected, preserve evidence and follow the security team's key revocation and incident response procedure.",
  ],

  evidenceCollection: {
    capture: [
      "Incident start time, timezone, first known failure, last successful request, and recent change window.",
      "Exact hostname, port, URL path, source network, client runtime, and affected request ID.",
      "Full error text with secrets, customer identifiers, and tokens redacted.",
      "DNS answers and resolved IP addresses from the failing client environment.",
      "Certificate subject, issuer, serial number, SHA-256 fingerprint, SANs, notBefore, and notAfter.",
      "Certificate chain sent by each endpoint, including whether intermediates are missing.",
      "Negotiated TLS version, cipher suite, and handshake result when available.",
      "Proxy, ingress, load-balancer listener, target group, and certificate attachment history.",
      "Kubernetes Ingress, TLS Secret metadata, cert-manager Certificate/Order/Challenge status, and controller logs.",
      "Java runtime version and truststore configuration without exposing passwords or private material.",
      "Application, proxy, load balancer, and audit logs correlated by timestamp.",
      "Certificate renewal events, DNS changes, deployment revisions, and secret synchronization events.",
    ],
    redactionRules: [
      "Private keys and key passwords must never be included.",
      "Do not share client certificate private keys or raw Kubernetes Secret contents.",
      "Redact access tokens, cookies, authorization headers, and sensitive query parameters.",
      "Certificate public metadata and SHA-256 fingerprints are generally suitable for diagnostics, subject to organizational policy.",
    ],
  },

  diagnosticWorkflow: [
    {
      step: 1,
      title: "Establish the failing connection boundary",
      goal:
        "Determine whether the failure occurs at DNS resolution, TCP connectivity, TLS negotiation, certificate verification, HTTP routing, or the upstream connection.",
      commands: [
        {
          command: "date -u",
          purpose:
            "Record UTC time on the diagnostic machine; compare it with service logs and the incident timeline.",
        },
        {
          command: "curl -v --connect-timeout 5 --max-time 15 https://api.example.com/health",
          purpose:
            "Observe DNS resolution, connection establishment, TLS verification, and HTTP response without disabling verification.",
        },
        {
          command: "curl -I --connect-timeout 5 --max-time 15 https://api.example.com/",
          purpose:
            "Check a safe endpoint's response headers when the service supports HEAD requests.",
        },
      ],
      decisions: [
        {
          if: "DNS resolution fails",
          then:
            "Inspect resolver configuration, DNS records, split-horizon DNS, and recent changes before debugging certificates.",
        },
        {
          if: "TCP connection times out or is refused",
          then:
            "Check routing, firewall rules, listener availability, security groups, network policy, and endpoint health.",
        },
        {
          if: "TLS certificate verification fails",
          then:
            "Proceed to certificate, hostname, chain, trust-store, and clock diagnostics.",
        },
        {
          if: "TLS succeeds but HTTP returns 4xx or 5xx",
          then:
            "Investigate routing, authentication, authorization, application health, and upstream behavior; do not assume a TLS misconfiguration.",
        },
        {
          if: "TLS succeeds at the edge but fails from the proxy to the backend",
          then:
            "Investigate the separate upstream TLS session, backend certificate, trust configuration, and SNI.",
        },
      ],
    },

    {
      step: 2,
      title: "Record DNS answers and endpoint coverage",
      commands: [
        {
          command: "dig +short A api.example.com",
          purpose: "List IPv4 DNS answers on systems with dig.",
        },
        {
          command: "dig +short AAAA api.example.com",
          purpose: "List IPv6 DNS answers.",
        },
        {
          command: "dig +short CNAME api.example.com",
          purpose: "Inspect the CNAME chain where applicable.",
        },
        {
          command: "nslookup api.example.com",
          purpose: "Alternative DNS check when dig is unavailable.",
        },
      ],
      decisions: [
        {
          if: "Different resolvers return different destinations",
          then:
            "Compare TTLs, split DNS, CDN or load-balancer records, resolver caches, and recent DNS changes.",
        },
        {
          if: "Only IPv6 or only IPv4 clients fail",
          then:
            "Test the failing address family separately and inspect the corresponding listener, routing, and certificate deployment.",
        },
        {
          if: "Several IPs are returned",
          then:
            "Test each approved endpoint individually with the correct hostname and SNI; compare fingerprints and expiration dates.",
        },
      ],
      notes: [
        "DNS output alone does not prove that a TLS certificate is correct.",
        "Do not change DNS records until the affected endpoint and intended destination are confirmed.",
      ],
    },

    {
      step: 3,
      title: "Inspect the live certificate with SNI enabled",
      commands: [
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts -verify_return_error -verify_hostname api.example.com </dev/null",
          purpose:
            "Inspect the certificate list sent by the server and request certificate-chain and hostname verification.",
        },
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -brief </dev/null",
          purpose:
            "Get a compact handshake summary on supported OpenSSL versions.",
        },
      ],
      decisions: [
        {
          if: "The certificate SAN does not cover api.example.com",
          then:
            "Inspect the certificate attached to the actual TLS termination point and correct the certificate or hostname configuration.",
        },
        {
          if: "A default or unexpected certificate is returned",
          then:
            "Check SNI handling, virtual-host configuration, listener certificate selection, ingress host rules, and default certificate settings.",
        },
        {
          if: "The chain cannot be verified",
          then:
            "Inspect intermediate certificates, issuer trust, server chain configuration, and the client's CA bundle.",
        },
        {
          if: "The handshake fails before a certificate is presented",
          then:
            "Investigate protocol compatibility, cipher support, client-certificate requirements, TLS alerts, and server logs.",
        },
      ],
      caveat:
        "The -showcerts option shows the certificate list sent by the peer; it is not, by itself, proof that the chain is trusted or complete. OpenSSL options and output vary by installed version.",
    },

    {
      step: 4,
      title: "Validate certificate dates, SANs, issuer, and fingerprint",
      commands: [
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts </dev/null 2>/dev/null",
          purpose:
            "Collect the live certificate response for inspection. Extract the leaf certificate using a controlled diagnostic workflow if needed.",
        },
        {
          command:
            "openssl x509 -in server.crt -noout -subject -issuer -serial -dates -fingerprint -sha256",
          purpose:
            "Inspect public metadata for a certificate file already collected securely.",
        },
        {
          command:
            "openssl x509 -in server.crt -noout -ext subjectAltName",
          purpose:
            "Inspect Subject Alternative Names on OpenSSL versions supporting -ext.",
        },
        {
          command:
            "openssl x509 -in server.crt -noout -checkhost api.example.com",
          purpose:
            "Check hostname matching on supported OpenSSL versions.",
        },
      ],
      decisions: [
        {
          if: "notAfter is in the past",
          then:
            "Check certificate renewal, deployment, and listener attachment. Deploy a valid approved certificate through the normal process.",
        },
        {
          if: "notBefore is in the future",
          then:
            "Compare endpoint and client clocks, issuance time, and certificate deployment timing.",
        },
        {
          if: "SAN is missing or mismatched",
          then:
            "Issue or select a certificate containing the exact required DNS name or appropriate SAN entries.",
        },
        {
          if: "The fingerprint differs between endpoints",
          then:
            "Determine whether the difference is an expected rollout, a stale replica, or an unintended certificate attachment.",
        },
      ],
      caveat:
        "Replace server.crt with a certificate file obtained from an approved diagnostic process. Do not save private keys in a shared workspace.",
    },

    {
      step: 5,
      title: "Check the certificate chain and trust store",
      commands: [
        {
          command:
            "openssl verify -CAfile trusted-ca.pem -untrusted intermediates.pem server.crt",
          purpose:
            "Verify a certificate against an explicitly supplied CA bundle and intermediate certificates.",
        },
        {
          command:
            "curl --cacert trusted-ca.pem https://api.example.com/health",
          purpose:
            "Test a private or organization-approved CA bundle without disabling verification.",
        },
        {
          command:
            "curl -v https://api.example.com/health",
          purpose:
            "Inspect which certificate verification error the client reports.",
        },
      ],
      decisions: [
        {
          if: "A required intermediate certificate is missing",
          then:
            "Configure the server or TLS terminator to serve the leaf certificate followed by required intermediate certificates.",
        },
        {
          if: "The certificate chains to an internal CA",
          then:
            "Install the approved CA certificate into the correct trust store for the specific client runtime or container image.",
        },
        {
          if: "Only one client fails to trust a public CA",
          then:
            "Compare its CA bundle, runtime version, proxy inspection, and certificate path with a working client.",
        },
        {
          if: "Verification fails after a CA rotation",
          then:
            "Check trust-store distribution and overlap timing; deploy the approved new trust chain before removing old trust where the migration plan requires overlap.",
        },
      ],
      caveat:
        "Do not blindly download a certificate from the failing endpoint and trust it. Validate CA identity and fingerprints using an approved independent source.",
    },

    {
      step: 6,
      title: "Compare endpoints, IPs, and SNI behavior",
      commands: [
        {
          command:
            "curl --resolve api.example.com:443:203.0.113.10 https://api.example.com/health",
          purpose:
            "Test a specific approved IP while preserving the hostname used for TLS verification and HTTP routing.",
        },
        {
          command:
            "openssl s_client -connect 203.0.113.10:443 -servername api.example.com -showcerts -verify_return_error -verify_hostname api.example.com </dev/null",
          purpose:
            "Inspect the certificate served by a specific endpoint while sending the expected SNI name.",
        },
      ],
      decisions: [
        {
          if: "One IP serves an old certificate",
          then:
            "Inspect rollout status, listener attachments, edge caches, and configuration propagation for that endpoint.",
        },
        {
          if: "The certificate changes when SNI is omitted",
          then:
            "Check the default virtual host and ensure clients send the expected hostname during the TLS handshake.",
        },
        {
          if: "Direct endpoint tests pass but the public URL fails",
          then:
            "Investigate CDN/WAF termination, public DNS, proxy configuration, and edge certificate distribution.",
        },
      ],
      caveat:
        "Use only IPs belonging to the approved service. Documentation IP ranges are examples, not real service addresses.",
    },

    {
      step: 7,
      title: "Investigate protocol and cipher compatibility",
      commands: [
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -tls1_2 </dev/null",
          purpose:
            "Test TLS 1.2 support when permitted by the installed OpenSSL build and the approved security policy.",
        },
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -tls1_3 </dev/null",
          purpose:
            "Test TLS 1.3 support where available.",
        },
        {
          command: "openssl version -a",
          purpose:
            "Record the OpenSSL version and build details on the diagnostic client.",
        },
        {
          command: "curl -V",
          purpose:
            "Identify the TLS backend and supported protocols of the installed curl binary.",
        },
      ],
      decisions: [
        {
          if: "Only older clients fail",
          then:
            "Compare client runtime, protocol support, cipher overlap, signature algorithms, and the organization's minimum TLS policy.",
        },
        {
          if: "A protocol-specific test fails",
          then:
            "Correlate with server policy and logs; account for the client tool's own build and supported options.",
        },
        {
          if: "A recent security policy change triggered the issue",
          then:
            "Identify the exact compatibility regression and choose an approved secure configuration supported by required clients.",
        },
      ],
      safety:
        "Never enable obsolete SSL/TLS versions, weak ciphers, or insecure renegotiation merely to make a legacy client connect. Upgrade or replace the client where required.",
    },

    {
      step: 8,
      title: "Check mutual TLS (mTLS)",
      symptoms: [
        "Handshake rejected when the client certificate is absent.",
        "Client certificate is presented but rejected by the server.",
        "Client certificate expired or issued by an untrusted CA.",
        "Certificate has the wrong Extended Key Usage or is not valid for client authentication.",
        "Reverse proxy validates a client certificate, but the backend receives different identity information.",
      ],
      commands: [
        {
          command:
            "openssl s_client -connect api.example.com:443 -servername api.example.com -cert client.crt -key client.key -CAfile server-ca.pem -verify_return_error </dev/null",
          purpose:
            "Test mTLS using an authorized client certificate, its private key, and the approved server trust bundle.",
        },
        {
          command:
            "openssl x509 -in client.crt -noout -subject -issuer -dates -fingerprint -sha256",
          purpose:
            "Inspect client certificate metadata without exposing its private key.",
        },
      ],
      decisions: [
        {
          if: "No client certificate was supplied",
          then:
            "Confirm whether the endpoint requires mTLS and whether the application or proxy is configured with the correct client certificate.",
        },
        {
          if: "The client certificate is not trusted",
          then:
            "Verify the issuing CA and configure the intended client-CA trust bundle on the server.",
        },
        {
          if: "TLS succeeds but HTTP returns 401 or 403",
          then:
            "Investigate application authentication, certificate-to-identity mapping, and authorization policies separately.",
        },
      ],
      safety:
        "Do not copy client.key into tickets, chat, shell history, or shared logs. Use approved secret storage and restrict access to diagnostic hosts.",
    },

    {
      step: 9,
      title: "Inspect NGINX, reverse proxies, and TLS termination",
      commands: [
        {
          command: "nginx -t",
          purpose:
            "Validate NGINX configuration syntax before reload.",
        },
        {
          command: "nginx -T",
          purpose:
            "Inspect the effective NGINX configuration; handle its output as sensitive because it may reveal internal topology or paths.",
        },
      ],
      checks: [
        "Correct listen address and port with TLS enabled.",
        "Correct server_name and SNI-based virtual host selection.",
        "Correct ssl_certificate and ssl_certificate_key paths.",
        "Leaf certificate appears before intermediate certificates in a combined chain file.",
        "The certificate and private key match.",
        "The configured TLS protocols and ciphers satisfy the approved security baseline.",
        "Frontend and upstream TLS settings are evaluated independently.",
        "A reload is performed only after syntax validation and approval.",
      ],
      decisions: [
        {
          if: "Configuration test fails",
          then:
            "Fix the reported syntax, file access, certificate format, or key-matching problem before reload.",
        },
        {
          if: "Configuration test passes but the old certificate remains live",
          then:
            "Check whether the intended server block is active, the correct file was changed, and the reload reached all relevant instances.",
        },
        {
          if: "Frontend TLS works but upstream TLS fails",
          then:
            "Check proxy_ssl settings, upstream hostname verification, SNI, trusted CA configuration, and backend certificate validity.",
        },
      ],
      safety:
        "Do not publish full production configuration dumps or key file contents. Use the service's supported validation and graceful reload procedures.",
    },

    {
      step: 10,
      title: "Troubleshoot Kubernetes Ingress and TLS Secrets",
      commands: [
        {
          command: "kubectl config current-context",
          purpose: "Confirm the current Kubernetes context.",
        },
        {
          command: "kubectl get ingress -A",
          purpose: "Find relevant Ingress resources and their hosts.",
        },
        {
          command:
            "kubectl -n production describe ingress api-ingress",
          purpose:
            "Inspect host rules, referenced TLS Secret, events, and controller-related details.",
        },
        {
          command:
            "kubectl -n production get secret api-tls -o jsonpath='{.type}{\"\\n\"}'",
          purpose:
            "Check the Secret type without printing certificate or private-key data.",
        },
        {
          command:
            "kubectl -n production get secret api-tls -o jsonpath='{.metadata.creationTimestamp}{\"\\n\"}'",
          purpose:
            "Inspect Secret creation time as one piece of rotation evidence.",
        },
        {
          command:
            "kubectl -n production get pods",
          purpose:
            "Check workload health before investigating controller-specific issues.",
        },
      ],
      checks: [
        "The Ingress host matches the requested hostname.",
        "The TLS section references the correct Secret in the correct namespace.",
        "The Secret is of type kubernetes.io/tls when required by the controller.",
        "The certificate and key are a matching pair.",
        "The controller is watching the intended Ingress class.",
        "The controller has successfully loaded the new certificate.",
        "The default certificate is not unintentionally being served.",
        "The TLS Secret update reached all relevant controllers or replicas.",
        "The external load balancer and ingress controller do not serve conflicting certificates.",
      ],
      decisions: [
        {
          if: "The default or self-signed certificate is returned",
          then:
            "Check the TLS Secret reference, namespace, hostname rule, Ingress class, and controller default certificate configuration.",
        },
        {
          if: "The controller reports certificate and key mismatch",
          then:
            "Compare public-key fingerprints from the certificate and private key using an approved local workflow, then restore the correct pair.",
        },
        {
          if: "Secret looks correct but the endpoint serves the old certificate",
          then:
            "Check controller events/logs, secret synchronization, rollout status, and which layer terminates public TLS.",
        },
      ],
      caveat:
        "Avoid commands that print Secret data or private keys to terminal logs. Secret metadata alone does not prove the certificate contents are valid.",
    },

    {
      step: 11,
      title: "Investigate cert-manager and certificate renewal",
      commands: [
        {
          command: "kubectl get certificates -A",
          purpose: "Check certificate resource readiness across namespaces.",
        },
        {
          command: "kubectl get certificaterequests -A",
          purpose: "Inspect certificate request status.",
        },
        {
          command: "kubectl get orders,challenges -A",
          purpose:
            "Inspect ACME Order and Challenge resources where the installed cert-manager setup uses them.",
        },
        {
          command:
            "kubectl -n cert-manager logs deploy/cert-manager --since=30m",
          purpose:
            "Inspect recent controller logs; adjust the namespace and workload name for the installation.",
        },
      ],
      decisions: [
        {
          if: "Certificate is not Ready",
          then:
            "Inspect status conditions, issuer readiness, DNS or HTTP challenge validation, and controller logs.",
        },
        {
          if: "DNS challenge fails",
          then:
            "Verify the intended DNS zone, TXT record propagation, credentials, permissions, and propagation timing.",
        },
        {
          if: "Certificate resource is Ready but clients see an expired certificate",
          then:
            "Check the target Secret, certificate attachment, controller reload, DNS destinations, and edge propagation.",
        },
        {
          if: "Renewal repeatedly fails",
          then:
            "Fix the underlying issuer or validation issue, verify renewal lead time, and test the complete issuance-to-deployment path.",
        },
      ],
      safety:
        "Do not repeatedly delete Certificate, Order, or Secret resources as a first response. Preserve status and events before any corrective action.",
    },

    {
      step: 12,
      title: "Check Java applications and truststores",
      symptoms: [
        "javax.net.ssl.SSLHandshakeException",
        "PKIX path building failed",
        "unable to find valid certification path",
        "No subject alternative DNS name matching",
        "Received fatal alert: handshake_failure",
      ],
      commands: [
        {
          command: "java -version",
          purpose: "Record the Java runtime version used by the failing application.",
        },
        {
          command:
            "keytool -list -cacerts",
          purpose:
            "Inspect the default Java CA store interactively; do not expose truststore passwords.",
        },
        {
          command:
            "keytool -list -keystore /secure/path/truststore.p12 -storetype PKCS12",
          purpose:
            "Inspect a custom truststore using an approved interactive password prompt.",
        },
      ],
      checks: [
        "Identify the exact Java process and runtime; the shell's Java version may differ from the application's.",
        "Confirm whether javax.net.ssl.trustStore or application-specific trust configuration overrides defaults.",
        "Check whether the container image contains an outdated CA bundle.",
        "Validate hostname verification rather than bypassing it.",
        "Check certificate validity and intermediate CA distribution.",
        "Correlate errors with JDK upgrades, truststore changes, and proxy inspection certificates.",
      ],
      decisions: [
        {
          if: "PKIX path building failed",
          then:
            "Validate the presented chain and the trust anchors available to that exact Java runtime.",
        },
        {
          if: "Hostname verification fails",
          then:
            "Correct the certificate SAN or requested hostname; do not disable hostname verification.",
        },
        {
          if: "Only one application fails",
          then:
            "Compare its runtime, truststore, proxy, and HTTP client configuration with a working application.",
        },
      ],
      safety:
        "Avoid enabling verbose TLS debug logs broadly in production. If required, use a controlled reproduction, restrict access, and remove debug settings after evidence collection.",
    },

    {
      step: 13,
      title: "Inspect cloud load balancers and CDN edges",
      checks: [
        "Correct certificate is attached to the intended HTTPS listener.",
        "Certificate is in the required account, region, project, and subscription.",
        "Certificate covers the public hostname and is valid for the listener.",
        "Listener security policy supports the required protocol and cipher baseline.",
        "Target group health and backend TLS configuration are correct.",
        "CDN or WAF edge certificates have finished propagating.",
        "DNS points to the intended distribution or load balancer.",
        "Frontend TLS and backend TLS are checked as separate connections.",
        "Certificate renewal and attachment events align with the incident timeline.",
      ],
      decisions: [
        {
          if: "The edge serves the wrong certificate",
          then:
            "Inspect listener or distribution certificate selection, hostname aliases, regional resources, and propagation status.",
        },
        {
          if: "TLS terminates at the load balancer but backend calls fail",
          then:
            "Check target health, backend listener protocol, trust requirements, and the backend certificate independently.",
        },
        {
          if: "Only one region or edge location fails",
          then:
            "Compare regional certificate attachments, configuration versions, DNS routing, and propagation status.",
        },
      ],
      safety:
        "Use read-only cloud inspection first. Do not replace listener policies or certificates in the wrong region/account based only on a hostname.",
    },

    {
      step: 14,
      title: "Check time synchronization and runtime differences",
      commands: [
        {
          command: "date -u",
          purpose: "Compare the diagnostic host's UTC time.",
        },
        {
          command: "timedatectl status",
          purpose:
            "Inspect system clock and synchronization status on systems using systemd.",
        },
        {
          command: "openssl version -a",
          purpose: "Compare OpenSSL versions across diagnostic hosts.",
        },
        {
          command: "curl -V",
          purpose: "Compare TLS backends and supported protocols.",
        },
      ],
      checks: [
        "Check whether the affected host clock is ahead or behind.",
        "Compare base image, runtime, trust bundle, and library versions.",
        "Check environment-specific proxy and CA bundle variables without printing secrets.",
        "Compare working and failing clients using the same hostname and endpoint.",
      ],
      decisions: [
        {
          if: "Certificate appears not yet valid",
          then:
            "Validate clock synchronization and issuance/deployment times before changing certificate material.",
        },
        {
          if: "Only a newly built container image fails",
          then:
            "Compare its CA bundle, TLS library, runtime, and environment configuration with the previous known-good image.",
        },
      ],
    },

    {
      step: 15,
      title: "Correlate logs and recent changes",
      evidenceSources: [
        "Application TLS exceptions and request error rates.",
        "Reverse-proxy handshake and upstream connection logs.",
        "Ingress controller events and logs.",
        "Cloud load balancer access and TLS error logs where available.",
        "Certificate issuer and renewal controller events.",
        "Deployment history, Git diffs, and configuration rollout timestamps.",
        "DNS change records and CDN distribution events.",
        "Security audit logs for unexpected certificate, listener, or Secret changes.",
      ],
      workflow: [
        "Normalize timestamps to UTC.",
        "Build a timeline from the last known good request to the first failure.",
        "Compare the affected and unaffected clients or endpoints.",
        "Identify changes that correlate with the failure but do not assume correlation proves causation.",
        "Reproduce using a controlled client and a specific endpoint.",
        "Document the evidence that confirms or eliminates each hypothesis.",
      ],
    },

    {
      step: 16,
      title: "Isolate the root cause using evidence",
      decisionMatrix: [
        {
          symptom: "Certificate expired",
          likelyCauses: [
            "Renewal did not run.",
            "Renewal failed.",
            "New certificate was not deployed.",
            "Old certificate remains attached to an endpoint.",
          ],
          evidence:
            "notAfter, issuer status, Secret/attachment history, and live endpoint fingerprint.",
          fix:
            "Renew or deploy the approved valid certificate and verify every endpoint.",
        },
        {
          symptom: "Hostname mismatch",
          likelyCauses: [
            "Wrong certificate attached.",
            "Missing SAN.",
            "Wrong SNI or virtual host.",
            "Incorrect DNS or proxy target.",
          ],
          evidence:
            "Requested hostname, SAN list, SNI test, DNS answers, and endpoint fingerprints.",
          fix:
            "Correct the certificate selection, hostname, or routing configuration.",
        },
        {
          symptom: "Unknown issuer or incomplete chain",
          likelyCauses: [
            "Missing intermediate certificate.",
            "Wrong chain bundle.",
            "Outdated client trust store.",
            "Private CA not distributed to the client.",
          ],
          evidence:
            "Presented chain, verification output, trusted CA bundle, and issuer details.",
          fix:
            "Serve the correct chain or distribute the approved trust anchor.",
        },
        {
          symptom: "Only one IP or region fails",
          likelyCauses: [
            "Partial rollout.",
            "Stale listener attachment.",
            "Edge propagation delay.",
            "Unexpected DNS destination.",
          ],
          evidence:
            "Per-endpoint certificate fingerprints, DNS answers, rollout events, and listener state.",
          fix:
            "Correct the affected endpoint using the approved rollout procedure.",
        },
        {
          symptom: "TLS handshake failure",
          likelyCauses: [
            "Protocol or cipher mismatch.",
            "Client certificate required but missing.",
            "Signature algorithm incompatibility.",
            "Wrong listener or SNI selection.",
          ],
          evidence:
            "TLS alert, server logs, client runtime, negotiated settings, and mTLS configuration.",
          fix:
            "Restore a secure, mutually supported configuration or correct the client certificate flow.",
        },
        {
          symptom: "Java PKIX path building failed",
          likelyCauses: [
            "Missing CA in the Java truststore.",
            "Incomplete chain.",
            "Wrong custom truststore.",
            "Old runtime or container CA bundle.",
          ],
          evidence:
            "Runtime configuration, truststore metadata, presented chain, and successful comparison client.",
          fix:
            "Correct the chain or approved trust configuration for the actual runtime.",
        },
        {
          symptom: "mTLS rejected",
          likelyCauses: [
            "Client certificate missing or expired.",
            "Client CA not trusted.",
            "Wrong certificate purpose.",
            "Proxy identity mapping or authorization failure.",
          ],
          evidence:
            "Client certificate metadata, server trust configuration, handshake logs, and HTTP response.",
          fix:
            "Correct certificate issuance, trust, or identity mapping.",
        },
        {
          symptom: "TLS succeeds but API returns 502/503",
          likelyCauses: [
            "Backend unavailable.",
            "Upstream TLS failure.",
            "Backend certificate or SNI mismatch.",
            "Health check or routing failure.",
          ],
          evidence:
            "Frontend handshake result, proxy upstream logs, target health, and backend TLS test.",
          fix:
            "Troubleshoot the backend connection separately from frontend TLS.",
        },
      ],
    },

    {
      step: 17,
      title: "Apply a safe fix and recover service",
      procedure: [
        "Confirm the root cause with at least one direct diagnostic result and supporting configuration or event evidence.",
        "Select the smallest change that corrects the verified cause.",
        "Obtain the required change approval and identify the rollback path.",
        "For certificate renewal, verify the issuer, SANs, validity period, chain, and certificate-to-key match.",
        "For trust-store changes, validate the CA identity through the approved distribution channel.",
        "For proxy or listener changes, run the supported syntax or configuration validation first.",
        "Deploy through the normal secret-management, GitOps, or change-management workflow.",
        "Use a rolling rollout or staged propagation where supported.",
        "Verify the actual certificate served by each relevant endpoint after the change.",
        "Run application health checks and a representative end-to-end request.",
        "Monitor TLS failures, 4xx/5xx rates, latency, and client-specific errors.",
        "Keep the incident open until the service owner confirms recovery and the acceptance criteria are met.",
      ],
      recoveryRules: [
        "If a certificate is expired, use the approved renewal or replacement workflow; do not simply extend trust for an expired certificate.",
        "If the private key may be compromised, follow security incident response, replacement, and revocation requirements.",
        "If only one endpoint is stale, correct that endpoint rather than restarting all services.",
        "If a trust-store update is needed, distribute the correct approved CA rather than trusting an arbitrary server certificate.",
        "If a TLS policy change breaks legacy clients, identify a secure compatibility path; do not re-enable obsolete protocols as a blanket workaround.",
        "If recovery increases errors, use the approved rollback to the last known-good configuration while preserving required security controls.",
      ],
    },

    {
      step: 18,
      title: "Post-recovery validation",
      checklist: [
        "The expected hostname resolves to the intended destination.",
        "TLS handshake succeeds from the affected client network.",
        "The live certificate SAN matches the hostname.",
        "The live certificate is within its validity period.",
        "The chain verifies using the expected trust store.",
        "All required endpoints and regions serve the intended certificate.",
        "Required mTLS clients authenticate successfully.",
        "TLS protocol and cipher policy remain compliant.",
        "Application health and representative API requests succeed.",
        "No increase in 5xx responses, latency, or handshake failures is observed.",
        "Renewal automation and certificate monitoring are healthy.",
        "Security controls were not disabled as a workaround.",
        "The service owner confirms recovery and the incident timeline is updated.",
      ],
    },
  ],

  commandReference: {
    curl: [
      {
        command: "curl -v https://api.example.com/",
        meaning: "Verbose connection and certificate-verification diagnostics.",
      },
      {
        command:
          "curl --resolve api.example.com:443:203.0.113.10 https://api.example.com/",
        meaning:
          "Test one approved endpoint while retaining the hostname for verification.",
      },
      {
        command:
          "curl --cacert trusted-ca.pem https://api.example.com/",
        meaning: "Test using an explicitly selected CA bundle.",
      },
    ],
    openssl: [
      {
        command:
          "openssl s_client -connect api.example.com:443 -servername api.example.com -showcerts </dev/null",
        meaning: "Inspect the certificate list sent by the endpoint with SNI.",
      },
      {
        command:
          "openssl x509 -in server.crt -noout -subject -issuer -dates -fingerprint -sha256",
        meaning: "Inspect certificate metadata.",
      },
      {
        command:
          "openssl x509 -in server.crt -noout -ext subjectAltName",
        meaning: "Inspect SAN entries.",
      },
      {
        command:
          "openssl verify -CAfile trusted-ca.pem -untrusted intermediates.pem server.crt",
        meaning: "Verify a chain using an explicitly supplied trust bundle.",
      },
    ],
    kubernetes: [
      {
        command: "kubectl config current-context",
        meaning: "Confirm the active cluster context.",
      },
      {
        command: "kubectl -n production describe ingress api-ingress",
        meaning: "Inspect Ingress rules, TLS references, and events.",
      },
      {
        command:
          "kubectl -n production get secret api-tls -o jsonpath='{.type}{\"\\n\"}'",
        meaning: "Check Secret type without revealing secret data.",
      },
      {
        command: "kubectl get certificates -A",
        meaning: "Inspect cert-manager Certificate resources when installed.",
      },
    ],
    warnings: [
      "Commands may vary by operating system and installed OpenSSL, curl, Kubernetes, and controller versions.",
      "Replace example hostnames, paths, namespaces, and certificate filenames with approved environment-specific values.",
      "Avoid shell tracing and shared terminal recordings when commands involve credentials.",
      "Do not use curl -k or --insecure as a production recovery step; it disables important verification.",
    ],
  },

  commonMisconfigurations: [
    {
      issue: "Expired certificate",
      detection: "Certificate notAfter is earlier than the current time.",
      resolution: "Renew and deploy the approved certificate; verify the live endpoint afterward.",
    },
    {
      issue: "Missing intermediate certificate",
      detection: "Chain validation fails and the server does not provide a required intermediate.",
      resolution: "Serve the correct leaf-plus-intermediate chain.",
    },
    {
      issue: "SNI mismatch",
      detection: "Different certificate returned for the requested hostname.",
      resolution: "Correct virtual host, listener certificate selection, or client SNI behavior.",
    },
    {
      issue: "Wrong Kubernetes Secret",
      detection: "Ingress references a different namespace, Secret, or host.",
      resolution: "Correct the reference and verify controller reconciliation.",
    },
    {
      issue: "Certificate/private key mismatch",
      detection: "Proxy cannot load the key pair or reports a public-key mismatch.",
      resolution: "Deploy the correct approved matching pair; never expose the private key during investigation.",
    },
    {
      issue: "Untrusted private CA",
      detection: "Only clients lacking the organization's CA trust fail.",
      resolution: "Distribute the approved CA through managed trust configuration.",
    },
    {
      issue: "TLS policy incompatibility",
      detection: "Handshake fails for specific runtimes or supported protocol sets.",
      resolution: "Use a secure mutually supported configuration or upgrade the client.",
    },
    {
      issue: "mTLS client identity failure",
      detection: "Server rejects client certificate or certificate mapping.",
      resolution: "Correct client certificate, trusted client CA, purpose, or identity mapping.",
    },
    {
      issue: "Partial certificate rotation",
      detection: "Some replicas or regions serve a different fingerprint.",
      resolution: "Complete or roll back the controlled deployment and validate all endpoints.",
    },
    {
      issue: "Frontend/backend TLS confusion",
      detection: "External TLS succeeds while proxy-to-backend TLS fails.",
      resolution: "Test each TLS boundary independently and correct the failing side.",
    },
  ],

  prevention: {
    certificateLifecycle: [
      "Maintain an inventory of certificates, owners, hostnames, issuers, environments, and expiry dates.",
      "Automate renewal with a supported certificate-management system.",
      "Alert well before expiration and monitor renewal failures, not just certificate age.",
      "Validate that renewed certificates are actually attached to every intended endpoint.",
      "Monitor SAN, issuer, fingerprint, chain validity, and endpoint coverage where appropriate.",
      "Test renewal and rotation in a staging environment before production rollout.",
    ],
    secureConfiguration: [
      "Enforce approved TLS protocol and cipher baselines.",
      "Keep private keys in approved secret-management systems with least-privilege access.",
      "Use explicit hostname verification for outbound TLS connections.",
      "Use managed CA trust stores and documented procedures for private CA distribution.",
      "Test mTLS certificate issuance, rotation, and identity mapping.",
      "Review certificate and listener changes through change management.",
    ],
    automation: [
      "Run certificate expiry and SAN checks in CI.",
      "Validate proxy configuration before deployment.",
      "Check Kubernetes Ingress host and Secret references.",
      "Add synthetic TLS checks from outside and inside the network.",
      "Compare endpoint fingerprints during rollout and alert on unexpected differences.",
      "Use canary rollout and automatic rollback criteria where supported.",
      "Avoid logging private keys, secret values, or sensitive TLS debug data.",
    ],
    alerting: [
      "Certificate expiration thresholds.",
      "Certificate renewal or issuance failure.",
      "TLS handshake failure rate.",
      "Hostname and chain verification failures.",
      "Unexpected certificate fingerprint changes.",
      "Regional or per-endpoint certificate inconsistencies.",
      "mTLS authentication failure rate.",
      "Upstream TLS failures and proxy 502/503 responses.",
    ],
  },

  incidentReportTemplate: {
    title: "TLS Misconfiguration Incident Report",
    fields: [
      "Incident ID and severity",
      "Start, detection, mitigation, and recovery times in UTC",
      "Affected hostname, service, environment, region, and clients",
      "Customer and business impact",
      "Observed TLS error and representative sanitized logs",
      "Expected versus observed certificate metadata and fingerprint",
      "DNS, endpoint, SNI, chain, protocol, and trust-store findings",
      "Recent changes and evidence timeline",
      "Confirmed root cause and supporting evidence",
      "Corrective change and approval",
      "Recovery validation results",
      "Security implications and key-compromise assessment",
      "Prevention actions, owners, and deadlines",
      "Lessons learned and runbook updates",
    ],
  },

  handsOnLabs: [
    {
      title: "Lab 1 — Inspect a live HTTPS certificate",
      tasks: [
        "Run curl -v against a test endpoint.",
        "Inspect the endpoint with openssl s_client and the expected SNI name.",
        "Record subject, issuer, SAN, expiry, and fingerprint.",
        "Explain why a successful TLS handshake alone is not sufficient evidence of correct application routing.",
      ],
    },
    {
      title: "Lab 2 — Compare endpoints",
      tasks: [
        "Resolve a controlled test hostname.",
        "Test each approved endpoint using curl --resolve.",
        "Compare fingerprints and expiry dates.",
        "Identify whether differences are expected during a staged rollout.",
      ],
    },
    {
      title: "Lab 3 — Certificate chain validation",
      tasks: [
        "Use a controlled certificate and trusted CA bundle.",
        "Run openssl verify with the intended trust inputs.",
        "Observe how missing intermediate certificates affect validation.",
        "Restore the correct chain and repeat verification.",
      ],
    },
    {
      title: "Lab 4 — Kubernetes Ingress TLS",
      tasks: [
        "Inspect a test Ingress host and its referenced TLS Secret.",
        "Check Secret type without displaying its data.",
        "Review controller events and certificate status.",
        "Confirm the endpoint serves the expected certificate.",
      ],
    },
    {
      title: "Lab 5 — mTLS failure analysis",
      tasks: [
        "Use a disposable test server and authorized client certificate.",
        "Test with the correct client certificate and CA bundle.",
        "Observe the failure when the required client certificate is absent.",
        "Restore the correct certificate configuration and verify the handshake.",
      ],
    },
  ],

  interviewQuestions: [
    {
      question: "What is the difference between a TLS handshake failure and a certificate verification failure?",
      answer:
        "A handshake failure can occur before a usable session is established due to protocol, cipher, signature, SNI, or client-certificate problems. Certificate verification failure means the client cannot validate the peer certificate or its identity; exact error timing depends on the TLS implementation.",
    },
    {
      question: "What does SNI solve?",
      answer:
        "Server Name Indication allows a client to provide the requested hostname during the TLS handshake so a server hosting multiple HTTPS names can select the appropriate certificate.",
    },
    {
      question: "Why can one browser work while an application fails?",
      answer:
        "They may use different CA stores, runtimes, TLS libraries, proxies, hostname-verification behavior, protocol support, or cached connections.",
    },
    {
      question: "What is the difference between a certificate and a private key?",
      answer:
        "The certificate contains public identity and key information signed by an issuer. The private key must remain confidential and is used for cryptographic operations proving possession of the corresponding key.",
    },
    {
      question: "Does openssl s_client -showcerts prove the chain is trusted?",
      answer:
        "No. It shows the certificates sent by the server. Chain validation must be assessed separately using the intended trust anchors and verification options.",
    },
    {
      question: "How would you investigate a certificate that is correct on one load-balancer IP but wrong on another?",
      answer:
        "Compare DNS answers, endpoint fingerprints, listener attachments, deployment versions, regional configuration, and propagation status. Preserve the hostname and SNI during per-endpoint testing.",
    },
    {
      question: "What is mTLS?",
      answer:
        "Mutual TLS authenticates the server to the client and also requires the client to present a certificate that the server validates according to its trust and identity policies.",
    },
    {
      question: "Why is curl -k dangerous as a production fix?",
      answer:
        "It disables certificate verification, potentially allowing an attacker or unintended endpoint to impersonate the service. Use it neither as a permanent workaround nor as proof that TLS is correctly configured.",
    },
    {
      question: "How do you troubleshoot Java PKIX path building failed?",
      answer:
        "Inspect the presented chain, the actual Java runtime and truststore, private CA distribution, intermediate certificates, and proxy behavior. Fix the chain or approved trust configuration without disabling verification.",
    },
    {
      question: "Why might frontend TLS work while backend requests fail?",
      answer:
        "Frontend and backend are separate TLS connections. The proxy may trust the public certificate at the edge but fail to verify the backend certificate, hostname, SNI, or CA chain.",
    },
    {
      question: "How would you prevent certificate-expiry incidents?",
      answer:
        "Use automated renewal, early warning alerts, certificate inventory, renewal-failure monitoring, controlled deployment, endpoint verification, and regular rotation tests.",
    },
    {
      question: "When should a TLS incident be escalated to security?",
      answer:
        "Immediately when private-key compromise, unexpected certificate replacement, possible interception, unauthorized trust changes, or a deliberate weakening of TLS controls is suspected.",
    },
  ],

  completionChecklist: [
    "Incident scope, severity, and TLS termination boundary are documented.",
    "DNS and endpoint destinations are verified.",
    "Live certificate SAN, validity, issuer, and fingerprint are recorded.",
    "Certificate chain and trust-store behavior are validated.",
    "SNI and per-endpoint differences are checked.",
    "Protocol, cipher, and mTLS compatibility are investigated when relevant.",
    "Proxy, cloud load balancer, Kubernetes, or Java-specific checks are completed as applicable.",
    "Root cause is supported by evidence rather than assumptions.",
    "The approved minimal fix is applied and validated.",
    "Application health and affected client paths are confirmed.",
    "Monitoring and certificate renewal automation are healthy.",
    "Incident report and prevention actions are assigned.",
  ],

  officialReferences: [
    {
      title: "OpenSSL s_client documentation",
      url: "https://docs.openssl.org/3.0/man1/openssl-s_client/",
      use: "TLS connection diagnostics, SNI, certificate display, and verification options.",
    },
    {
      title: "OpenSSL x509 documentation",
      url: "https://docs.openssl.org/3.0/man1/openssl-x509/",
      use: "Certificate metadata and validation-related commands.",
    },
    {
      title: "OpenSSL verify documentation",
      url: "https://docs.openssl.org/3.0/man1/openssl-verify/",
      use: "Certificate-chain verification and trust inputs.",
    },
    {
      title: "curl certificate verification",
      url: "https://curl.se/docs/sslcerts.html",
      use: "CA stores, hostname checks, and certificate verification behavior.",
    },
    {
      title: "curl FAQ — certificate verify failed",
      url: "https://curl.se/docs/faq.html",
      use: "Common certificate validation failures and why disabling verification is unsafe.",
    },
    {
      title: "NGINX HTTPS configuration",
      url: "https://nginx.org/en/docs/http/configuring_https_servers.html",
      use: "Certificate chains, virtual hosts, SNI, and HTTPS configuration.",
    },
    {
      title: "Kubernetes Ingress NGINX TLS guide",
      url: "https://kubernetes.github.io/ingress-nginx/user-guide/tls/",
      use: "TLS Secrets, hostname rules, default certificates, and cert-manager integration.",
    },
    {
      title: "AWS Application Load Balancer troubleshooting",
      url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html",
      use: "DNS, HTTPS listener, certificate, and target troubleshooting.",
    },
    {
      title: "Java keytool documentation",
      url: "https://docs.oracle.com/en/java/javase/21/docs/specs/man/keytool.html",
      use: "Inspecting Java key stores and trust stores.",
    },
    {
      title: "cert-manager documentation",
      url: "https://cert-manager.io/docs/",
      use: "Certificate issuance, renewal, and Kubernetes certificate lifecycle.",
    },
    {
      title: "OWASP Transport Layer Security Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html",
      use: "TLS security configuration and deployment guidance.",
    },
  ],
} as const;

export default tlsMisconfigGuide;
