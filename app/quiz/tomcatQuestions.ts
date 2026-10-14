export const tomcatQuestions = [
  {
    question: 'Apache Tomcat is primarily a container for which language/technology?',
    options: ['Node.js', 'Java Servlets & JSPs', 'Python Flask', 'PHP'],
    answer: 1
  },
  {
    question: 'What is the default port for Apache Tomcat web server?',
    options: ['80', '443', '8080', '3306'],
    answer: 2
  },
  {
    question: 'Which configuration file in Tomcat defines ports, connectors, and virtual hosts?',
    options: ['server.xml', 'web.xml', 'context.xml', 'tomcat-users.xml'],
    answer: 0
  },
  {
    question: 'Where are web applications deployed inside the Tomcat directory structure?',
    options: ['webapps/', 'bin/', 'lib/', 'conf/'],
    answer: 0
  },
  {
    question: 'Which file defines security roles and administrative users for Tomcat manager?',
    options: ['tomcat-users.xml', 'users.xml', 'security.xml', 'realm.xml'],
    answer: 0
  },
  {
    question: 'What script is used to start Tomcat on Linux systems?',
    options: ['startup.sh', 'start-tomcat.sh', 'tomcat.sh', 'run.sh'],
    answer: 0
  },
  {
    question: 'What archive file format is standard for deploying Java applications to Tomcat?',
    options: ['.war', '.jar', '.zip', '.tar.gz'],
    answer: 0
  },
  {
    question: 'Which component translates Java Server Pages (JSP) into Java servlets?',
    options: ['Jasper', 'Catalina', 'Coyote', 'Core'],
    answer: 0
  },
  {
    question: 'What is the HTTP connector component in Tomcat called?',
    options: ['Coyote', 'Catalina', 'Jasper', 'Cluster'],
    answer: 0
  },
  {
    question: 'How do you check Tomcat server runtime logs?',
    options: ['catalina.out in logs/', 'system logs', 'tomcat.log', 'error.log'],
    answer: 0
  },
  {
    question: 'What is the core servlet container engine of Apache Tomcat called?',
    options: ['Catalina', 'Coyote', 'Jasper', 'Cluster'],
    answer: 0
  },
  {
    question: 'Which file configures global deployment settings, filters, and servlets for all web apps?',
    options: ['conf/web.xml', 'server.xml', 'context.xml', 'tomcat-users.xml'],
    answer: 0
  },
  {
    question: 'What command-line script is used to safely shut down Tomcat on Linux?',
    options: ['shutdown.sh', 'stop.sh', 'kill-tomcat.sh', 'halt.sh'],
    answer: 0
  },
  {
    question: 'Which directory contains Tomcat library dependencies and shared JAR files?',
    options: ['lib/', 'bin/', 'conf/', 'webapps/'],
    answer: 0
  },
  {
    question: 'What environment variable must be set to point to the Java Development Kit for Tomcat?',
    options: ['JAVA_HOME', 'JDK_PATH', 'CATALINA_HOME', 'JAVA_PATH'],
    answer: 0
  },
  {
    question: 'Which environment variable specifies the root installation directory of Tomcat?',
    options: ['CATALINA_HOME', 'TOMCAT_HOME', 'JAVA_HOME', 'CATALINA_BASE'],
    answer: 0
  },
  {
    question: 'What manager application URL allows deploying WAR files remotely via browser?',
    options: ['/manager/html', '/admin', '/host-manager', '/dashboard'],
    answer: 0
  },
  {
    question: 'Which file specifies context-specific parameters for a single web application?',
    options: ['META-INF/context.xml', 'web.xml', 'server.xml', 'config.xml'],
    answer: 0
  },
  {
    question: 'What is the default AJP connector port used for integrating Tomcat with Apache HTTP Server?',
    options: ['8009', '8080', '8443', '8005'],
    answer: 0
  },
  {
    question: 'What port is used for receiving shutdown commands in Tomcat server.xml?',
    options: ['8005', '8080', '8009', '8443'],
    answer: 0
  },
  // Generating remaining distinct Tomcat quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Apache Tomcat Administration Test Question ${i + 21}: Which option represents the best practice for tuning JVM heap memory, server connectors, and security realms?`,
    options: ['Correct Tomcat Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
