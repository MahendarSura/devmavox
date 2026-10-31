import type { DevOpsTool } from "./command-types";

export const apacheTomcatTool: DevOpsTool = {
    name: "Apache Tomcat",
    category: "Web & Servers",
    commands: [
      { command: "java -version", level: "Basic", english: "to check the Java runtime version", telugu: "Tomcat కోసం Java version చూడటానికి." },
      { command: "curl -I http://localhost:8080", level: "Intermediate", english: "to inspect the Tomcat HTTP response", telugu: "Tomcat HTTP response చూడటానికి." },
      { command: "tail -n 100 <tomcat-path>/logs/catalina.out", level: "Advanced", english: "to inspect recent Tomcat application logs", telugu: "Tomcat application logs చూడటానికి." },
      { command: "ss -lntp", level: "Troubleshooting", english: "to check listening TCP ports", telugu: "Tomcat port సహా listening TCP ports చూడటానికి." },
    ],
  };
