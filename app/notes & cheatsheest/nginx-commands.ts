import type { DevOpsTool } from "./command-types";

export const nginxTool: DevOpsTool = {
    name: "NGINX",
    category: "Web & Servers",
    commands: [
      { command: "nginx -v", level: "Basic", english: "to display the NGINX version", telugu: "NGINX version చూడటానికి." },
      { command: "nginx -t", level: "Intermediate", english: "to test NGINX configuration syntax", telugu: "NGINX configuration syntax తనిఖీ చేయటానికి." },
      { command: "nginx -T", level: "Advanced", english: "to print the loaded NGINX configuration", telugu: "Load అయిన NGINX configuration చూడటానికి." },
      { command: "journalctl -u nginx -n 100 --no-pager", level: "Troubleshooting", english: "to inspect recent NGINX service logs", telugu: "NGINX service logs చూడటానికి." },
      {
        command: "sudo nginx -t",
        level: "Basic",
        english: "Test NGINX configuration syntax.",
        telugu: "NGINX configuration syntax validate cheyyataniki.",
      },
      {
        command: "sudo systemctl status nginx",
        level: "Basic",
        english: "Check the NGINX service status.",
        telugu: "NGINX service status chudataniki.",
      },
      {
        command: "sudo journalctl -u nginx -n 100 --no-pager",
        level: "Troubleshooting",
        english: "Inspect recent NGINX service logs.",
        telugu: "NGINX service logs troubleshoot cheyyataniki.",
      },
      {
        command: "sudo tail -n 100 /var/log/nginx/error.log",
        level: "Troubleshooting",
        english: "Inspect the latest NGINX error log lines.",
        telugu: "Recent NGINX errors chudataniki.",
      },
      {
        command: "sudo tail -n 100 /var/log/nginx/access.log",
        level: "Intermediate",
        english: "Inspect recent NGINX access requests.",
        telugu: "Recent HTTP requests inspect cheyyataniki.",
      },
      {
        command: "curl -I http://localhost/",
        level: "Basic",
        english: "Check response headers from the local NGINX server.",
        telugu: "Local NGINX HTTP headers verify cheyyataniki.",
      },
      {
        command: "curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost/health",
        level: "Troubleshooting",
        english: "Check the HTTP status for a health endpoint.",
        telugu: "Health endpoint response status check cheyyataniki.",
      },
      {
        command: "sudo nginx -s reload",
        level: "Intermediate",
        english: "Reload NGINX configuration gracefully.",
        telugu: "Configuration reload cheyyataniki; mundu nginx -t run cheyyali.",
      },
      {
        command: "sudo nginx -s reopen",
        level: "Advanced",
        english: "Reopen log files after log rotation.",
        telugu: "Log rotation tarvatha log files reopen cheyyataniki.",
      },
      {
        command: "sudo nginx -s quit",
        level: "Advanced",
        english: "Request a graceful NGINX shutdown.",
        telugu: "Graceful shutdown request cheyyataniki; production traffic impact consider cheyyali.",
      },
      {
        command: "sudo ss -tulpn | grep nginx",
        level: "Troubleshooting",
        english: "Check listening sockets associated with NGINX.",
        telugu: "NGINX listen chestunna ports identify cheyyataniki.",
      },
      {
        command: "grep -Rni 'server_name' /etc/nginx/",
        level: "Intermediate",
        english: "Locate configured server names.",
        telugu: "Virtual host server_name directives search cheyyataniki.",
      },
      {
        command: "grep -Rni 'proxy_pass' /etc/nginx/",
        level: "Intermediate",
        english: "Locate reverse-proxy upstream directives.",
        telugu: "Reverse proxy upstream configuration inspect cheyyataniki.",
      },
      {
        command: "grep -Rni 'listen' /etc/nginx/",
        level: "Basic",
        english: "Locate configured listening ports.",
        telugu: "NGINX listen ports search cheyyataniki.",
      },
      {
        command: "sudo find /etc/nginx -type f -name '*.conf'",
        level: "Basic",
        english: "List NGINX configuration files.",
        telugu: "NGINX configuration files list chudataniki.",
      },
      {
        command: "curl -sS -H 'Host: example.com' http://127.0.0.1/",
        level: "Troubleshooting",
        english: "Test virtual-host routing using a Host header.",
        telugu: "Host header dwara virtual host route test cheyyataniki.",
      },
      {
        command: "curl -sS -o /dev/null -w '%{time_total}\\n' http://localhost/",
        level: "Advanced",
        english: "Measure total response time for a local request.",
        telugu: "Local request total response time measure cheyyataniki.",
      },
    ],
  };
