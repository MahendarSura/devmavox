export interface TopicQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export const topicQuestions: TopicQuestion[] = [
  {
    id: "nginx-1",
    question: "What is Nginx primarily used for?",
    options: [
      "Database management only",
      "Web server, reverse proxy, and load balancer",
      "Container image building",
      "Source code version control"
    ],
    answer: 1
  },
  {
    id: "nginx-2",
    question: "Which command checks the Nginx configuration for syntax errors?",
    options: [
      "nginx -s check",
      "nginx --validate",
      "nginx -t",
      "systemctl test nginx"
    ],
    answer: 2
  },
  {
    id: "nginx-3",
    question: "Which command reloads Nginx configuration gracefully?",
    options: [
      "nginx -s reload",
      "nginx -s destroy",
      "nginx --reset",
      "nginx -s reinstall"
    ],
    answer: 0
  },
  {
    id: "nginx-4",
    question: "What is a reverse proxy?",
    options: [
      "A client-side browser cache",
      "A database replication service",
      "A tool that compiles application code",
      "A server that receives client requests and forwards them to backend servers"
    ],
    answer: 3
  },
  {
    id: "nginx-5",
    question: "Which Nginx directive defines a group of backend servers?",
    options: [
      "server_group",
      "upstream",
      "backend_pool",
      "proxy_group"
    ],
    answer: 1
  },
  {
    id: "nginx-6",
    question: "Which directive forwards a request to an upstream backend?",
    options: [
      "root",
      "listen",
      "proxy_pass",
      "server_name"
    ],
    answer: 2
  },
  {
    id: "nginx-7",
    question: "Which configuration context commonly contains HTTP virtual servers?",
    options: [
      "http",
      "events",
      "user",
      "pid"
    ],
    answer: 0
  },
  {
    id: "nginx-8",
    question: "Which directive specifies the port on which an HTTP server listens?",
    options: [
      "port",
      "bind_port",
      "server_port",
      "listen"
    ],
    answer: 3
  },
  {
    id: "nginx-9",
    question: "What is the default HTTP port commonly used by Nginx?",
    options: [
      "22",
      "80",
      "3306",
      "5432"
    ],
    answer: 1
  },
  {
    id: "nginx-10",
    question: "Which port is commonly used for HTTPS?",
    options: [
      "8080",
      "3000",
      "443",
      "9090"
    ],
    answer: 2
  },
  {
    id: "nginx-11",
    question: "What does the server_name directive do?",
    options: [
      "Matches the requested hostname to a server block",
      "Defines the backend database",
      "Changes the Linux hostname",
      "Sets the TLS cipher automatically"
    ],
    answer: 0
  },
  {
    id: "nginx-12",
    question: "What is a common purpose of the location directive?",
    options: [
      "To create Linux users",
      "To define Docker networks",
      "To configure DNS records",
      "To match request URIs and apply configuration"
    ],
    answer: 3
  },
  {
    id: "nginx-13",
    question: "Which directive sets the directory used to serve static files?",
    options: [
      "proxy_pass",
      "root",
      "upstream",
      "worker_connections"
    ],
    answer: 1
  },
  {
    id: "nginx-14",
    question: "What is the purpose of try_files?",
    options: [
      "To test database connections",
      "To retry failed TLS handshakes",
      "To check for files in order and optionally fall back to a URI",
      "To restart Nginx workers"
    ],
    answer: 2
  },
  {
    id: "nginx-15",
    question: "Which directive is commonly used to specify an index file?",
    options: [
      "index",
      "default_page",
      "home_file",
      "main"
    ],
    answer: 0
  },
  {
    id: "nginx-16",
    question: "Which command sends a graceful stop signal to Nginx?",
    options: [
      "nginx -s reload",
      "nginx -s reopen",
      "nginx -s quit",
      "nginx -s force"
    ],
    answer: 2
  },
  {
    id: "nginx-17",
    question: "What does a graceful Nginx reload generally do?",
    options: [
      "Deletes the configuration",
      "Starts new workers with the new configuration while old workers finish existing requests",
      "Deletes all active connections immediately",
      "Reinstalls the service"
    ],
    answer: 1
  },
  {
    id: "nginx-18",
    question: "Which command commonly displays the Nginx service status on systemd Linux?",
    options: [
      "service nginx compile",
      "nginx --status",
      "ps nginx --all",
      "systemctl status nginx"
    ],
    answer: 3
  },
  {
    id: "nginx-19",
    question: "Where are Nginx access logs commonly configured?",
    options: [
      "access_log directive",
      "error_page directive",
      "worker_processes directive",
      "events directive"
    ],
    answer: 0
  },
  {
    id: "nginx-20",
    question: "Which directive controls Nginx error logging?",
    options: [
      "access_log",
      "log_format",
      "error_log",
      "error_page"
    ],
    answer: 2
  },
  {
    id: "nginx-21",
    question: "What is the default load-balancing method for an Nginx upstream group?",
    options: [
      "Least connections",
      "Round robin",
      "IP hash",
      "Random weighted hash"
    ],
    answer: 1
  },
  {
    id: "nginx-22",
    question: "What does round-robin load balancing do?",
    options: [
      "Sends every request to one fixed server",
      "Chooses the server with the most active connections",
      "Routes only requests from one IP",
      "Distributes requests sequentially across available upstream servers"
    ],
    answer: 3
  },
  {
    id: "nginx-23",
    question: "Which Nginx load-balancing method considers the number of active connections?",
    options: [
      "least_conn",
      "ip_hash",
      "hash_only",
      "first_server"
    ],
    answer: 0
  },
  {
    id: "nginx-24",
    question: "What is the purpose of the weight parameter in an upstream server definition?",
    options: [
      "To set the server's CPU limit",
      "To configure TLS certificate size",
      "To influence the share of requests assigned to that server",
      "To limit the request body size"
    ],
    answer: 2
  },
  {
    id: "nginx-25",
    question: "What does the backup parameter mean for an upstream server?",
    options: [
      "It stores a copy of application files",
      "It designates the server for use when primary servers are unavailable under applicable upstream rules",
      "It automatically backs up Nginx logs",
      "It encrypts the server connection"
    ],
    answer: 1
  },
  {
    id: "nginx-26",
    question: "What is a typical use of ip_hash?",
    options: [
      "Compressing client IP addresses",
      "Blocking every repeated request",
      "Choosing a server randomly on every request",
      "Helping requests from the same client IP map consistently to an upstream server"
    ],
    answer: 3
  },
  {
    id: "nginx-27",
    question: "What is a limitation of IP-based session persistence?",
    options: [
      "Clients behind NAT may share an IP, and client IP changes can alter routing",
      "It requires every backend to use a different port",
      "It disables HTTP",
      "It always encrypts sessions"
    ],
    answer: 0
  },
  {
    id: "nginx-28",
    question: "What does the max_fails parameter configure?",
    options: [
      "Maximum file size",
      "Maximum worker count",
      "The number of unsuccessful attempts considered when determining upstream availability",
      "Maximum TLS certificate age"
    ],
    answer: 2
  },
  {
    id: "nginx-29",
    question: "What does fail_timeout affect in a standard upstream server configuration?",
    options: [
      "The browser session duration only",
      "The period used for failure counting and temporary unavailability",
      "The Linux reboot timeout",
      "The duration of DNS registration"
    ],
    answer: 1
  },
  {
    id: "nginx-30",
    question: "What is an important limitation of open-source Nginx upstream failure handling?",
    options: [
      "It cannot proxy HTTP",
      "It cannot define multiple upstream servers",
      "It cannot write logs",
      "Passive failure checks are not the same as continuous active health checks"
    ],
    answer: 3
  },
  {
    id: "nginx-31",
    question: "What is an active health check designed to do?",
    options: [
      "Proactively probe a backend to determine its health",
      "Delete unhealthy servers from DNS permanently",
      "Increase CPU automatically",
      "Restart the application source code"
    ],
    answer: 0
  },
  {
    id: "nginx-32",
    question: "What should a backend health endpoint ideally report?",
    options: [
      "Only the server's hostname",
      "The full contents of every database table",
      "Whether the application can serve requests according to its health criteria",
      "The administrator's password"
    ],
    answer: 2
  },
  {
    id: "nginx-33",
    question: "What is a common benefit of using a load balancer?",
    options: [
      "It eliminates all software bugs",
      "It distributes traffic and can improve availability and capacity",
      "It guarantees zero latency",
      "It replaces all monitoring"
    ],
    answer: 1
  },
  {
    id: "nginx-34",
    question: "What can happen if a load balancer sends traffic to an unhealthy backend?",
    options: [
      "The database automatically repairs itself",
      "All TLS certificates renew immediately",
      "The backend gains more CPU",
      "Users may experience errors or timeouts"
    ],
    answer: 3
  },
  {
    id: "nginx-35",
    question: "Why should backend capacity be considered when configuring load balancing?",
    options: [
      "Uneven or excessive traffic can overload backend servers",
      "It changes the DNS root zone",
      "It removes the need for TLS",
      "It disables caching"
    ],
    answer: 0
  },
  {
    id: "nginx-36",
    question: "What is TLS termination at Nginx?",
    options: [
      "Disabling all network encryption",
      "Moving application code to Nginx",
      "Decrypting HTTPS traffic at Nginx before proxying it onward",
      "Deleting TLS certificates after every request"
    ],
    answer: 2
  },
  {
    id: "nginx-37",
    question: "Which directive specifies the TLS certificate file?",
    options: [
      "ssl_certificate_key",
      "ssl_certificate",
      "tls_public_key",
      "certificate_path"
    ],
    answer: 1
  },
  {
    id: "nginx-38",
    question: "Which directive specifies the private key file for a TLS certificate?",
    options: [
      "ssl_certificate",
      "ssl_protocols",
      "ssl_trusted_certificate",
      "ssl_certificate_key"
    ],
    answer: 3
  },
  {
    id: "nginx-39",
    question: "Why must the private key file be protected?",
    options: [
      "Anyone with access may be able to impersonate the server if the key is compromised",
      "It contains the application's HTML",
      "It controls CPU scheduling",
      "It stores all access logs"
    ],
    answer: 0
  },
  {
    id: "nginx-40",
    question: "What is SNI in TLS?",
    options: [
      "A Linux package manager",
      "A load-balancing algorithm",
      "A TLS extension that allows a client to indicate the hostname during the handshake",
      "A DNS zone transfer protocol"
    ],
    answer: 2
  },
  {
    id: "nginx-41",
    question: "What is a common reason for an HTTPS certificate warning?",
    options: [
      "The server has too many worker processes",
      "The certificate is expired, untrusted, or does not match the hostname",
      "The access log is enabled",
      "The backend uses JSON"
    ],
    answer: 1
  },
  {
    id: "nginx-42",
    question: "What does HTTP-to-HTTPS redirection achieve?",
    options: [
      "It makes every backend private automatically",
      "It encrypts traffic before the redirect response itself",
      "It replaces the certificate",
      "It directs clients from HTTP to the HTTPS endpoint"
    ],
    answer: 3
  },
  {
    id: "nginx-43",
    question: "Which HTTP status code is commonly used for a permanent redirect?",
    options: [
      "301",
      "200",
      "404",
      "503"
    ],
    answer: 0
  },
  {
    id: "nginx-44",
    question: "Which HTTP status code is commonly used for a temporary redirect?",
    options: [
      "201",
      "204",
      "302",
      "500"
    ],
    answer: 2
  },
  {
    id: "nginx-45",
    question: "What does the proxy_set_header directive do?",
    options: [
      "Sets Linux kernel headers",
      "Sets or changes request headers sent to the proxied server",
      "Configures response compression only",
      "Changes the backend's operating system"
    ],
    answer: 1
  },
  {
    id: "nginx-46",
    question: "Why is the Host header often forwarded to an application backend?",
    options: [
      "To control disk partitions",
      "To replace DNS entirely",
      "To encrypt the HTTP body",
      "To let the backend know which hostname the client requested"
    ],
    answer: 3
  },
  {
    id: "nginx-47",
    question: "What is X-Forwarded-For commonly used for?",
    options: [
      "Passing the originating client IP through proxies",
      "Setting the backend password",
      "Enabling database replication",
      "Selecting a TLS certificate file"
    ],
    answer: 0
  },
  {
    id: "nginx-48",
    question: "What is the purpose of X-Forwarded-Proto?",
    options: [
      "To identify the database engine",
      "To set the request's JSON schema",
      "To communicate the original request scheme, such as HTTP or HTTPS",
      "To define a Kubernetes namespace"
    ],
    answer: 2
  },
  {
    id: "nginx-49",
    question: "What is a security concern when trusting forwarded headers?",
    options: [
      "They always disable HTTP/2",
      "Clients may spoof them unless trusted proxy boundaries are configured",
      "They prevent all caching",
      "They automatically expose TLS private keys"
    ],
    answer: 1
  },
  {
    id: "nginx-50",
    question: "What is the purpose of proxy_read_timeout?",
    options: [
      "To set the TLS certificate expiration",
      "To control how often access logs rotate",
      "To set DNS record TTL",
      "To limit the wait between successive read operations from the proxied server"
    ],
    answer: 3
  },
  {
    id: "nginx-51",
    question: "What does proxy_connect_timeout control?",
    options: [
      "The time allowed to establish a connection to a proxied server",
      "The user's browser cache lifetime",
      "The duration of a Linux boot",
      "The lifetime of an SSL certificate"
    ],
    answer: 0
  },
  {
    id: "nginx-52",
    question: "What does proxy_send_timeout control?",
    options: [
      "The client DNS lookup time",
      "The application deployment interval",
      "The time between successive write operations to the proxied server",
      "The time required to renew a certificate"
    ],
    answer: 2
  },
  {
    id: "nginx-53",
    question: "What is a risk of setting proxy_read_timeout excessively high?",
    options: [
      "Nginx will stop accepting HTTPS",
      "Slow or stuck requests may occupy resources for longer",
      "All requests become cached",
      "DNS records will disappear"
    ],
    answer: 1
  },
  {
    id: "nginx-54",
    question: "Which directive commonly limits the maximum accepted client request body size?",
    options: [
      "client_body_timeout",
      "proxy_buffering",
      "worker_connections",
      "client_max_body_size"
    ],
    answer: 3
  },
  {
    id: "nginx-55",
    question: "Which HTTP status is commonly returned when the request body exceeds client_max_body_size?",
    options: [
      "413",
      "301",
      "304",
      "101"
    ],
    answer: 0
  },
  {
    id: "nginx-56",
    question: "What is the purpose of rate limiting?",
    options: [
      "To guarantee every request succeeds",
      "To increase payload sizes",
      "To restrict request frequency and help protect services from excessive traffic",
      "To disable all monitoring"
    ],
    answer: 2
  },
  {
    id: "nginx-57",
    question: "Which Nginx directive defines a shared zone for request rate limiting?",
    options: [
      "limit_conn_zone",
      "limit_req_zone",
      "request_rate",
      "rate_zone"
    ],
    answer: 1
  },
  {
    id: "nginx-58",
    question: "Which directive applies a configured request rate limit?",
    options: [
      "limit_req_zone",
      "limit_conn_zone",
      "limit_rate_zone",
      "limit_req"
    ],
    answer: 3
  },
  {
    id: "nginx-59",
    question: "Which directive can limit simultaneous connections based on a shared key zone?",
    options: [
      "limit_conn",
      "limit_req",
      "proxy_cache",
      "keepalive_timeout"
    ],
    answer: 0
  },
  {
    id: "nginx-60",
    question: "What should be considered when rate-limiting clients by IP address?",
    options: [
      "Every IP represents exactly one person",
      "IP addresses never change",
      "Many legitimate users may share a public IP through NAT",
      "Rate limits automatically detect user intent"
    ],
    answer: 2
  },
  {
    id: "nginx-61",
    question: "What is the purpose of proxy caching?",
    options: [
      "To store TLS private keys in browsers",
      "To reuse eligible backend responses and reduce repeated backend work",
      "To replace application authentication",
      "To make every response permanently fresh"
    ],
    answer: 1
  },
  {
    id: "nginx-62",
    question: "Which directive defines a proxy cache zone and its storage settings?",
    options: [
      "proxy_cache",
      "cache_enable",
      "cache_control",
      "proxy_cache_path"
    ],
    answer: 3
  },
  {
    id: "nginx-63",
    question: "Which directive enables use of a configured proxy cache in a location?",
    options: [
      "proxy_cache",
      "proxy_cache_path",
      "proxy_cache_key",
      "cache_root"
    ],
    answer: 0
  },
  {
    id: "nginx-64",
    question: "Why should authenticated or personalized responses be handled carefully when caching?",
    options: [
      "They always cause TLS failures",
      "They cannot contain HTTP headers",
      "Incorrect cache rules can expose one user's content to another",
      "They automatically disable load balancing"
    ],
    answer: 2
  },
  {
    id: "nginx-65",
    question: "What does a cache key determine?",
    options: [
      "The operating system user",
      "Which requests are treated as the same cached object",
      "The TLS certificate issuer",
      "The number of CPU cores"
    ],
    answer: 1
  },
  {
    id: "nginx-66",
    question: "What is cache invalidation?",
    options: [
      "Creating more worker processes",
      "Renewing TLS certificates",
      "Adding backend servers",
      "Removing or refreshing cached content when it is no longer valid"
    ],
    answer: 3
  },
  {
    id: "nginx-67",
    question: "What is a common purpose of gzip in Nginx?",
    options: [
      "Compressing eligible HTTP responses to reduce transfer size",
      "Encrypting HTTP traffic",
      "Balancing database writes",
      "Replacing JSON with SQL"
    ],
    answer: 0
  },
  {
    id: "nginx-68",
    question: "What is an important consideration when enabling compression?",
    options: [
      "Compression removes the need for HTTPS",
      "Every file type benefits equally",
      "CPU overhead and compression suitability should be considered",
      "Compression automatically fixes application errors"
    ],
    answer: 2
  },
  {
    id: "nginx-69",
    question: "What is the purpose of keep-alive connections?",
    options: [
      "To force a new TCP connection for every request",
      "To reuse connections and reduce connection setup overhead",
      "To disable HTTP headers",
      "To prevent all idle connections"
    ],
    answer: 1
  },
  {
    id: "nginx-70",
    question: "What can happen if keep-alive connections are configured poorly?",
    options: [
      "All DNS entries are deleted",
      "TLS certificates become invalid",
      "Nginx source code changes",
      "Idle connections may consume resources or connection reuse may be reduced"
    ],
    answer: 3
  },
  {
    id: "nginx-71",
    question: "What does worker_processes configure?",
    options: [
      "The number of Nginx worker processes",
      "The number of backend databases",
      "The number of DNS zones",
      "The number of TLS certificates"
    ],
    answer: 0
  },
  {
    id: "nginx-72",
    question: "What does worker_connections configure?",
    options: [
      "The number of application deployments",
      "The maximum HTTP body size",
      "The maximum simultaneous connections each worker can open, subject to other limits",
      "The number of server blocks"
    ],
    answer: 2
  },
  {
    id: "nginx-73",
    question: "Why is the worker_connections value not the same as total supported client requests?",
    options: [
      "Nginx does not use connections",
      "Each proxied request may consume connections to both client and upstream, and OS limits also apply",
      "Every request always uses ten workers",
      "It only applies to HTTPS certificates"
    ],
    answer: 1
  },
  {
    id: "nginx-74",
    question: "Which Linux command can show whether Nginx is listening on ports 80 or 443?",
    options: [
      "ls -la /etc/nginx",
      "chmod nginx",
      "cat /etc/hosts",
      "ss -lntp"
    ],
    answer: 3
  },
  {
    id: "nginx-75",
    question: "Which command is useful for checking an HTTP response from a server?",
    options: [
      "curl -I http://example.com",
      "mkdir http://example.com",
      "chmod 443 example.com",
      "terraform init example.com"
    ],
    answer: 0
  },
  {
    id: "nginx-76",
    question: "Nginx returns 502 Bad Gateway. What should you investigate first?",
    options: [
      "Whether the browser theme changed",
      "Whether the source-control branch is renamed",
      "Backend reachability, application health, upstream port, and error logs",
      "Whether the user has enough disk space on their phone"
    ],
    answer: 2
  },
  {
    id: "nginx-77",
    question: "What does HTTP 504 Gateway Timeout commonly indicate from a reverse proxy?",
    options: [
      "The client was redirected permanently",
      "The upstream did not respond in time",
      "The requested file was definitely found",
      "The TLS certificate is always expired"
    ],
    answer: 1
  },
  {
    id: "nginx-78",
    question: "What does HTTP 503 Service Unavailable commonly indicate?",
    options: [
      "The request succeeded",
      "The requested resource moved permanently",
      "The browser needs JavaScript",
      "The service is temporarily unable to handle the request"
    ],
    answer: 3
  },
  {
    id: "nginx-79",
    question: "Nginx returns 404 for an expected static file. What should you check?",
    options: [
      "The root or alias path, URI mapping, file existence, and permissions",
      "Only the CPU temperature",
      "Only the TLS cipher list",
      "Only the backend database schema"
    ],
    answer: 0
  },
  {
    id: "nginx-80",
    question: "Nginx fails to start after a configuration change. What is the best first step?",
    options: [
      "Delete the entire Nginx directory",
      "Reinstall Linux immediately",
      "Run nginx -t and inspect the reported error",
      "Disable every firewall rule"
    ],
    answer: 2
  },
  {
    id: "nginx-81",
    question: "Nginx returns 403 Forbidden for a static file. What should you inspect?",
    options: [
      "The Docker image tag only",
      "Filesystem permissions, directory traversal permissions, and access rules",
      "The Git commit author only",
      "The database replication lag only"
    ],
    answer: 1
  },
  {
    id: "nginx-82",
    question: "What is a common cause of Nginx reporting 'permission denied' while accessing files?",
    options: [
      "Too many DNS records",
      "An incorrect HTTP status code",
      "An expired Git branch",
      "Insufficient filesystem permissions or security policy restrictions"
    ],
    answer: 3
  },
  {
    id: "nginx-83",
    question: "Which files are useful when troubleshooting Nginx request failures?",
    options: [
      "Access and error logs",
      "Only shell history",
      "Only browser bookmarks",
      "Only Git tags"
    ],
    answer: 0
  },
  {
    id: "nginx-84",
    question: "Nginx serves an old version of a static asset after deployment. What could be responsible?",
    options: [
      "The Linux username",
      "The number of configured server blocks",
      "Browser caching, proxy caching, or a stale deployment path",
      "The default SSH port"
    ],
    answer: 2
  },
  {
    id: "nginx-85",
    question: "A website works directly on the backend but fails through Nginx. What should you compare?",
    options: [
      "Only the developer's editor theme",
      "Proxy headers, upstream address, URI rewriting, TLS, timeouts, and logs",
      "Only the GitHub profile",
      "Only the database table names"
    ],
    answer: 1
  },
  {
    id: "nginx-86",
    question: "What does the alias directive do in a location block?",
    options: [
      "Defines a backend load-balancing algorithm",
      "Sets the Nginx process owner",
      "Creates a DNS alias record",
      "Maps a matching location to a specified filesystem path"
    ],
    answer: 3
  },
  {
    id: "nginx-87",
    question: "How does alias differ from root in common static-file configurations?",
    options: [
      "Their path mapping behavior differs; alias replaces the matched location prefix with its configured path",
      "Alias only works for TLS certificates",
      "Root can never serve static files",
      "They are always interchangeable in every configuration"
    ],
    answer: 0
  },
  {
    id: "nginx-88",
    question: "Why can location matching rules cause unexpected behavior?",
    options: [
      "All location blocks always execute in file order",
      "Location directives are ignored by Nginx",
      "Prefix, exact, and regular-expression matching have different precedence rules",
      "Locations only apply to DNS queries"
    ],
    answer: 2
  },
  {
    id: "nginx-89",
    question: "What is a common use of the location = /health pattern?",
    options: [
      "To configure a wildcard TLS certificate",
      "To match the exact /health URI",
      "To define an upstream server group",
      "To set the system hostname"
    ],
    answer: 1
  },
  {
    id: "nginx-90",
    question: "What is the main purpose of a default server block?",
    options: [
      "To automatically fix every invalid request",
      "To store access logs",
      "To create a default DNS record",
      "To handle requests that do not match another server block for the listening address and port"
    ],
    answer: 3
  },
  {
    id: "nginx-91",
    question: "What is an important security practice for exposing Nginx publicly?",
    options: [
      "Keep Nginx and dependencies updated and expose only required ports",
      "Run every process with unrestricted privileges",
      "Publish private keys in a public repository",
      "Disable logs permanently"
    ],
    answer: 0
  },
  {
    id: "nginx-92",
    question: "Why should unnecessary HTTP methods be restricted when appropriate?",
    options: [
      "It makes all applications stateless",
      "It automatically enables caching",
      "It reduces the exposed request surface to the methods the application needs",
      "It removes the need for authentication"
    ],
    answer: 2
  },
  {
    id: "nginx-93",
    question: "What is the purpose of hiding unnecessary server version information?",
    options: [
      "To make DNS resolve faster in all cases",
      "To reduce information disclosure that may assist reconnaissance",
      "To guarantee immunity from attacks",
      "To enable backend autoscaling"
    ],
    answer: 1
  },
  {
    id: "nginx-94",
    question: "Why should Nginx error pages avoid exposing internal stack traces or sensitive paths?",
    options: [
      "Stack traces always cause 502 errors",
      "Internal paths must be sent to every client",
      "It improves load balancing weights",
      "Detailed internal information can help attackers and reveal sensitive implementation details"
    ],
    answer: 3
  },
  {
    id: "nginx-95",
    question: "What is a common benefit of running Nginx behind a cloud load balancer?",
    options: [
      "The cloud load balancer can provide an additional traffic entry point and availability layer",
      "It guarantees the application has no bugs",
      "It removes the need to configure backend health",
      "It automatically makes every backend publicly inaccessible"
    ],
    answer: 0
  },
  {
    id: "nginx-96",
    question: "In Kubernetes, what is a common way to expose HTTP applications through Nginx-based routing?",
    options: [
      "Store the application only in ConfigMaps",
      "Run every application as a privileged container",
      "Use an Nginx Ingress Controller with appropriate Ingress resources, when supported by the cluster setup",
      "Expose every pod through SSH"
    ],
    answer: 2
  },
  {
    id: "nginx-97",
    question: "What should be checked if an Nginx Ingress route returns 404 in Kubernetes?",
    options: [
      "Only the laptop's wallpaper",
      "Ingress host and path rules, controller logs, service name, and endpoints",
      "Only the Git repository stars",
      "Only the container image build date"
    ],
    answer: 1
  },
  {
    id: "nginx-98",
    question: "What is a sensible approach when deploying a new Nginx configuration in production?",
    options: [
      "Overwrite the only working configuration without validation",
      "Disable monitoring until deployment finishes",
      "Restart every server regardless of impact",
      "Validate configuration, reload gracefully, and monitor errors and traffic"
    ],
    answer: 3
  },
  {
    id: "nginx-99",
    question: "After adding a new backend, traffic is not reaching it. What should you verify?",
    options: [
      "Upstream configuration, DNS or IP resolution, network reachability, reload status, and backend health",
      "Only the server's desktop wallpaper",
      "Only the Git commit message",
      "Only the Nginx logo"
    ],
    answer: 0
  },
  {
    id: "nginx-100",
    question: "In a production incident with rising 5xx errors and high latency, what is the best initial response?",
    options: [
      "Immediately delete all logs",
      "Increase every timeout without investigation",
      "Check error rates, Nginx and upstream logs, backend health, resource saturation, and recent changes",
      "Disable the load balancer permanently"
    ],
    answer: 2
  }
];
