import type { DevOpsTool } from "./command-types";

export const tomcatTool: DevOpsTool = {
  name: "Tomcat",
  category: "Application Server",
  commands: [

    // ==================== BASIC - 50 ====================

    {
      command: "catalina.sh version",
      level: "Basic",
      english: "Displays the Apache Tomcat version and Java environment information.",
      telugu: "Apache Tomcat version మరియు Java environment information చూపిస్తుంది."
    },
    {
      command: "catalina.sh help",
      level: "Basic",
      english: "Displays available Catalina startup and management commands.",
      telugu: "Available Catalina startup మరియు management commands చూపిస్తుంది."
    },
    {
      command: "startup.sh",
      level: "Basic",
      english: "Starts the Apache Tomcat server.",
      telugu: "Apache Tomcat server ని start చేస్తుంది."
    },
    {
      command: "shutdown.sh",
      level: "Basic",
      english: "Stops the Apache Tomcat server.",
      telugu: "Apache Tomcat server ని stop చేస్తుంది."
    },
    {
      command: "catalina.sh start",
      level: "Basic",
      english: "Starts Tomcat using the Catalina startup script.",
      telugu: "Catalina startup script ఉపయోగించి Tomcat start చేస్తుంది."
    },
    {
      command: "catalina.sh stop",
      level: "Basic",
      english: "Stops Tomcat using the Catalina shutdown script.",
      telugu: "Catalina shutdown script ఉపయోగించి Tomcat stop చేస్తుంది."
    },
    {
      command: "catalina.sh run",
      level: "Basic",
      english: "Starts Tomcat in the foreground.",
      telugu: "Tomcat ని foreground లో start చేస్తుంది."
    },
    {
      command: "catalina.sh configtest",
      level: "Basic",
      english: "Checks the syntax of Tomcat configuration files.",
      telugu: "Tomcat configuration files syntax check చేస్తుంది."
    },
    {
      command: "catalina.sh stop -force",
      level: "Basic",
      english: "Attempts to stop Tomcat and force termination if necessary.",
      telugu: "Tomcat stop చేయడానికి ప్రయత్నించి అవసరమైతే force termination చేస్తుంది."
    },
    {
      command: "catalina.sh jpda start",
      level: "Basic",
      english: "Starts Tomcat with Java Platform Debugger Architecture enabled.",
      telugu: "Java debugging support enable చేసి Tomcat start చేస్తుంది."
    },
    {
      command: "catalina.sh jpda run",
      level: "Basic",
      english: "Runs Tomcat in the foreground with debugging enabled.",
      telugu: "Debugging enable చేసి Tomcat ని foreground లో run చేస్తుంది."
    },
    {
      command: "catalina.sh jpda stop",
      level: "Basic",
      english: "Stops a Tomcat instance started with JPDA debugging.",
      telugu: "JPDA debugging తో start చేసిన Tomcat instance ని stop చేస్తుంది."
    },
    {
      command: "version.sh",
      level: "Basic",
      english: "Displays Tomcat version information using the version script.",
      telugu: "Version script ద్వారా Tomcat version information చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME",
      level: "Basic",
      english: "Lists files and directories in the Tomcat installation directory.",
      telugu: "Tomcat installation directory లో files మరియు directories చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME/bin",
      level: "Basic",
      english: "Lists Tomcat executable scripts.",
      telugu: "Tomcat executable scripts చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME/conf",
      level: "Basic",
      english: "Lists Tomcat configuration files.",
      telugu: "Tomcat configuration files చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME/webapps",
      level: "Basic",
      english: "Lists applications deployed in the Tomcat webapps directory.",
      telugu: "Tomcat webapps directory లో deploy అయిన applications చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME/logs",
      level: "Basic",
      english: "Lists Tomcat log files.",
      telugu: "Tomcat log files చూపిస్తుంది."
    },
    {
      command: "ls $CATALINA_HOME/lib",
      level: "Basic",
      english: "Lists libraries available in the Tomcat installation.",
      telugu: "Tomcat installation లో available libraries చూపిస్తుంది."
    },
    {
      command: "cat $CATALINA_HOME/RELEASE-NOTES",
      level: "Basic",
      english: "Displays the Tomcat release notes.",
      telugu: "Tomcat release notes చూపిస్తుంది."
    },
    {
      command: "cat $CATALINA_HOME/conf/server.xml",
      level: "Basic",
      english: "Displays the main Tomcat server configuration file.",
      telugu: "Tomcat main server configuration file చూపిస్తుంది."
    },
    {
      command: "cat $CATALINA_HOME/conf/web.xml",
      level: "Basic",
      english: "Displays the default web application deployment descriptor.",
      telugu: "Default web application deployment descriptor చూపిస్తుంది."
    },
    {
      command: "cat $CATALINA_HOME/conf/context.xml",
      level: "Basic",
      english: "Displays the default Tomcat context configuration.",
      telugu: "Default Tomcat context configuration చూపిస్తుంది."
    },
    {
      command: "cat $CATALINA_HOME/conf/tomcat-users.xml",
      level: "Basic",
      english: "Displays the Tomcat user and role configuration file.",
      telugu: "Tomcat users మరియు roles configuration file చూపిస్తుంది."
    },
    {
      command: "echo $CATALINA_HOME",
      level: "Basic",
      english: "Displays the Tomcat installation directory environment variable.",
      telugu: "Tomcat installation directory environment variable చూపిస్తుంది."
    },
    {
      command: "echo $CATALINA_BASE",
      level: "Basic",
      english: "Displays the Tomcat instance configuration and runtime directory.",
      telugu: "Tomcat instance configuration మరియు runtime directory చూపిస్తుంది."
    },
    {
      command: "echo $JAVA_HOME",
      level: "Basic",
      english: "Displays the Java installation directory.",
      telugu: "Java installation directory చూపిస్తుంది."
    },
    {
      command: "java -version",
      level: "Basic",
      english: "Displays the installed Java runtime version.",
      telugu: "Install అయిన Java runtime version చూపిస్తుంది."
    },
    {
      command: "javac -version",
      level: "Basic",
      english: "Displays the installed Java compiler version.",
      telugu: "Install అయిన Java compiler version చూపిస్తుంది."
    },
    {
      command: "ps -ef | grep tomcat",
      level: "Basic",
      english: "Searches for running Tomcat processes.",
      telugu: "Running Tomcat processes కోసం search చేస్తుంది."
    },
    {
      command: "pgrep -af org.apache.catalina.startup.Bootstrap",
      level: "Basic",
      english: "Finds Tomcat Java processes using the Catalina Bootstrap class.",
      telugu: "Catalina Bootstrap class ఉపయోగిస్తున్న Tomcat Java processes కనుగొంటుంది."
    },
    {
      command: "ss -lntp",
      level: "Basic",
      english: "Displays listening TCP ports and associated processes.",
      telugu: "Listening TCP ports మరియు వాటికి సంబంధించిన processes చూపిస్తుంది."
    },
    {
      command: "curl -I http://localhost:8080",
      level: "Basic",
      english: "Checks the HTTP response headers from the Tomcat server.",
      telugu: "Tomcat server నుంచి HTTP response headers check చేస్తుంది."
    },
    {
      command: "curl http://localhost:8080",
      level: "Basic",
      english: "Sends an HTTP request to the Tomcat root application.",
      telugu: "Tomcat root application కి HTTP request పంపిస్తుంది."
    },
    {
      command: "curl -I http://localhost:8080/manager/html",
      level: "Basic",
      english: "Checks the HTTP response from the Tomcat Manager application.",
      telugu: "Tomcat Manager application HTTP response check చేస్తుంది."
    },
    {
      command: "tail -f $CATALINA_HOME/logs/catalina.out",
      level: "Basic",
      english: "Follows the Tomcat console log in real time.",
      telugu: "Tomcat console log ని real time లో చూపిస్తుంది."
    },
    {
      command: "tail -n 100 $CATALINA_HOME/logs/catalina.out",
      level: "Basic",
      english: "Displays the last 100 lines of the Tomcat console log.",
      telugu: "Tomcat console log లో చివరి 100 lines చూపిస్తుంది."
    },
    {
      command: "du -sh $CATALINA_HOME",
      level: "Basic",
      english: "Displays the total disk space used by the Tomcat installation.",
      telugu: "Tomcat installation ఉపయోగిస్తున్న మొత్తం disk space చూపిస్తుంది."
    },
    {
      command: "df -h",
      level: "Basic",
      english: "Displays available filesystem disk space.",
      telugu: "Available filesystem disk space చూపిస్తుంది."
    },
    {
      command: "chmod +x $CATALINA_HOME/bin/*.sh",
      level: "Basic",
      english: "Adds execute permission to Tomcat shell scripts.",
      telugu: "Tomcat shell scripts కి execute permission ఇస్తుంది."
    },
    {
      command: "cd $CATALINA_HOME",
      level: "Basic",
      english: "Changes the current directory to the Tomcat installation.",
      telugu: "Current directory ని Tomcat installation directory కి మారుస్తుంది."
    },
    {
      command: "cd $CATALINA_HOME/bin",
      level: "Basic",
      english: "Changes to the directory containing Tomcat scripts.",
      telugu: "Tomcat scripts ఉన్న directory కి వెళ్తుంది."
    },
    {
      command: "cd $CATALINA_HOME/logs",
      level: "Basic",
      english: "Changes to the Tomcat logs directory.",
      telugu: "Tomcat logs directory కి వెళ్తుంది."
    },
    {
      command: "find $CATALINA_HOME/webapps -maxdepth 1 -type f -name '*.war'",
      level: "Basic",
      english: "Finds WAR deployment files in the webapps directory.",
      telugu: "Webapps directory లో WAR deployment files కనుగొంటుంది."
    },
    {
      command: "find $CATALINA_HOME/logs -type f",
      level: "Basic",
      english: "Finds all files inside the Tomcat logs directory.",
      telugu: "Tomcat logs directory లోని అన్ని files కనుగొంటుంది."
    },
    {
      command: "cp application.war $CATALINA_HOME/webapps/",
      level: "Basic",
      english: "Copies a WAR application into the Tomcat deployment directory.",
      telugu: "WAR application ని Tomcat deployment directory లోకి copy చేస్తుంది."
    },
    {
      command: "mkdir -p $CATALINA_BASE/logs",
      level: "Basic",
      english: "Creates the Tomcat logs directory if it does not exist.",
      telugu: "Tomcat logs directory లేకపోతే create చేస్తుంది."
    },
    {
      command: "systemctl status tomcat",
      level: "Basic",
      english: "Displays the status of the Tomcat systemd service.",
      telugu: "Tomcat systemd service status చూపిస్తుంది."
    },
    {
      command: "systemctl start tomcat",
      level: "Basic",
      english: "Starts Tomcat through systemd.",
      telugu: "Systemd ద్వారా Tomcat start చేస్తుంది."
    },
    {
      command: "systemctl stop tomcat",
      level: "Basic",
      english: "Stops Tomcat through systemd.",
      telugu: "Systemd ద్వారా Tomcat stop చేస్తుంది."
    },
    {
      command: "systemctl restart tomcat",
      level: "Basic",
      english: "Restarts the Tomcat systemd service.",
      telugu: "Tomcat systemd service restart చేస్తుంది."
    },

    // ==================== INTERMEDIATE - 60 ====================

    {
      command: "systemctl enable tomcat",
      level: "Intermediate",
      english: "Enables Tomcat to start automatically during system boot.",
      telugu: "System boot సమయంలో Tomcat automatically start అయ్యేలా enable చేస్తుంది."
    },
    {
      command: "systemctl disable tomcat",
      level: "Intermediate",
      english: "Disables automatic Tomcat startup during system boot.",
      telugu: "System boot సమయంలో Tomcat automatic startup ని disable చేస్తుంది."
    },
    {
      command: "systemctl is-active tomcat",
      level: "Intermediate",
      english: "Checks whether the Tomcat service is currently active.",
      telugu: "Tomcat service ప్రస్తుతం active గా ఉందో check చేస్తుంది."
    },
    {
      command: "systemctl is-enabled tomcat",
      level: "Intermediate",
      english: "Checks whether Tomcat is enabled at system startup.",
      telugu: "System startup లో Tomcat enabled గా ఉందో check చేస్తుంది."
    },
    {
      command: "systemctl reload tomcat",
      level: "Intermediate",
      english: "Requests a configuration reload from the Tomcat service when supported.",
      telugu: "Support ఉన్నప్పుడు Tomcat service కి configuration reload request పంపిస్తుంది."
    },
    {
      command: "systemctl daemon-reload",
      level: "Intermediate",
      english: "Reloads systemd unit definitions after service configuration changes.",
      telugu: "Service configuration మారిన తర్వాత systemd unit definitions reload చేస్తుంది."
    },
    {
      command: "journalctl -u tomcat",
      level: "Intermediate",
      english: "Displays logs collected for the Tomcat systemd service.",
      telugu: "Tomcat systemd service కి సంబంధించిన logs చూపిస్తుంది."
    },
    {
      command: "journalctl -u tomcat -f",
      level: "Intermediate",
      english: "Follows Tomcat systemd logs in real time.",
      telugu: "Tomcat systemd logs ని real time లో చూపిస్తుంది."
    },
    {
      command: "journalctl -u tomcat --since today",
      level: "Intermediate",
      english: "Displays Tomcat service logs generated today.",
      telugu: "ఈరోజు generate అయిన Tomcat service logs చూపిస్తుంది."
    },
    {
      command: "journalctl -u tomcat -n 200",
      level: "Intermediate",
      english: "Displays the latest 200 Tomcat service log entries.",
      telugu: "Tomcat service కి సంబంధించిన చివరి 200 log entries చూపిస్తుంది."
    },
    {
      command: "grep -i 'error' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Searches the Tomcat console log for error messages.",
      telugu: "Tomcat console log లో error messages కోసం search చేస్తుంది."
    },
    {
      command: "grep -i 'exception' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Searches Tomcat logs for Java exceptions.",
      telugu: "Tomcat logs లో Java exceptions కోసం search చేస్తుంది."
    },
    {
      command: "grep -i 'SEVERE' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds severe-level messages in the Tomcat log.",
      telugu: "Tomcat log లో severe-level messages కనుగొంటుంది."
    },
    {
      command: "grep -i 'WARNING' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds warning messages in the Tomcat console log.",
      telugu: "Tomcat console log లో warning messages కనుగొంటుంది."
    },
    {
      command: "grep -n 'OutOfMemoryError' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds Java heap memory exhaustion errors with line numbers.",
      telugu: "Java heap memory exhaustion errors ని line numbers తో కనుగొంటుంది."
    },
    {
      command: "grep -n 'BindException' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds port binding exceptions in Tomcat logs.",
      telugu: "Tomcat logs లో port binding exceptions కనుగొంటుంది."
    },
    {
      command: "grep -n 'ClassNotFoundException' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds missing Java class errors in Tomcat logs.",
      telugu: "Tomcat logs లో missing Java class errors కనుగొంటుంది."
    },
    {
      command: "grep -n 'NoClassDefFoundError' $CATALINA_HOME/logs/catalina.out",
      level: "Intermediate",
      english: "Finds class loading errors caused by missing runtime classes.",
      telugu: "Missing runtime classes వల్ల వచ్చిన class loading errors కనుగొంటుంది."
    },
    {
      command: "ls -lh $CATALINA_HOME/webapps",
      level: "Intermediate",
      english: "Displays deployed application files and their sizes.",
      telugu: "Deploy అయిన application files మరియు వాటి sizes చూపిస్తుంది."
    },
    {
      command: "find $CATALINA_HOME/webapps -maxdepth 2 -name WEB-INF",
      level: "Intermediate",
      english: "Finds WEB-INF directories in deployed applications.",
      telugu: "Deploy అయిన applications లో WEB-INF directories కనుగొంటుంది."
    },
    {
      command: "jar tf application.war",
      level: "Intermediate",
      english: "Lists the contents of a WAR archive.",
      telugu: "WAR archive లోని files మరియు directories list చేస్తుంది."
    },
    {
      command: "jar tf application.war | grep WEB-INF",
      level: "Intermediate",
      english: "Checks whether a WAR archive contains WEB-INF entries.",
      telugu: "WAR archive లో WEB-INF entries ఉన్నాయో check చేస్తుంది."
    },
    {
      command: "unzip -l application.war",
      level: "Intermediate",
      english: "Lists files contained in a WAR package.",
      telugu: "WAR package లో ఉన్న files list చేస్తుంది."
    },
    {
      command: "unzip -t application.war",
      level: "Intermediate",
      english: "Tests the integrity of a WAR archive.",
      telugu: "WAR archive integrity check చేస్తుంది."
    },
    {
      command: "mkdir -p $CATALINA_HOME/webapps/myapp",
      level: "Intermediate",
      english: "Creates a deployment directory for an application.",
      telugu: "Application కోసం deployment directory create చేస్తుంది."
    },
    {
      command: "unzip application.war -d $CATALINA_HOME/webapps/myapp",
      level: "Intermediate",
      english: "Extracts a WAR archive into an application directory.",
      telugu: "WAR archive ని application directory లో extract చేస్తుంది."
    },
    {
      command: "rm -rf $CATALINA_HOME/webapps/myapp",
      level: "Intermediate",
      english: "Removes an exploded application directory from Tomcat.",
      telugu: "Tomcat నుంచి exploded application directory remove చేస్తుంది."
    },
    {
      command: "mv application.war $CATALINA_HOME/webapps/",
      level: "Intermediate",
      english: "Moves a WAR package into the Tomcat deployment directory.",
      telugu: "WAR package ని Tomcat deployment directory కి move చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/list",
      level: "Intermediate",
      english: "Lists deployed applications using the Tomcat Manager text interface.",
      telugu: "Tomcat Manager text interface ద్వారా deployed applications list చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/serverinfo",
      level: "Intermediate",
      english: "Retrieves Tomcat server information through the Manager interface.",
      telugu: "Manager interface ద్వారా Tomcat server information retrieve చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/reload?path=/myapp",
      level: "Intermediate",
      english: "Reloads a deployed application through the Tomcat Manager interface.",
      telugu: "Tomcat Manager interface ద్వారా deployed application reload చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/undeploy?path=/myapp",
      level: "Intermediate",
      english: "Undeploys an application through the Tomcat Manager text interface.",
      telugu: "Tomcat Manager text interface ద్వారా application undeploy చేస్తుంది."
    },
    {
      command: "curl -u admin:password -T application.war http://localhost:8080/manager/text/deploy?path=/myapp",
      level: "Intermediate",
      english: "Deploys a WAR file through the Tomcat Manager text interface.",
      telugu: "Tomcat Manager text interface ద్వారా WAR file deploy చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/sessions?path=/myapp",
      level: "Intermediate",
      english: "Displays session information for a deployed application.",
      telugu: "Deploy అయిన application session information చూపిస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/stop?path=/myapp",
      level: "Intermediate",
      english: "Stops a deployed application using the Manager interface.",
      telugu: "Manager interface ఉపయోగించి deployed application stop చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/start?path=/myapp",
      level: "Intermediate",
      english: "Starts a stopped application using the Manager interface.",
      telugu: "Manager interface ఉపయోగించి stopped application start చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/findleaks",
      level: "Intermediate",
      english: "Checks for web application memory leaks using Tomcat Manager.",
      telugu: "Tomcat Manager ద్వారా web application memory leaks check చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/vminfo",
      level: "Intermediate",
      english: "Retrieves JVM information through the Tomcat Manager interface.",
      telugu: "Tomcat Manager interface ద్వారా JVM information retrieve చేస్తుంది."
    },
    {
      command: "curl -u admin:password http://localhost:8080/manager/text/threaddump",
      level: "Intermediate",
      english: "Retrieves a JVM thread dump through Tomcat Manager.",
      telugu: "Tomcat Manager ద్వారా JVM thread dump retrieve చేస్తుంది."
    },
    {
      command: "keytool -list -keystore $JAVA_HOME/lib/security/cacerts",
      level: "Intermediate",
      english: "Lists certificates in the Java truststore.",
      telugu: "Java truststore లోని certificates list చేస్తుంది."
    },
    {
      command: "keytool -list -v -keystore tomcat.keystore",
      level: "Intermediate",
      english: "Displays detailed certificate information from a Tomcat keystore.",
      telugu: "Tomcat keystore లోని certificate details చూపిస్తుంది."
    },
    {
      command: "keytool -genkeypair -alias tomcat -keyalg RSA -keystore tomcat.keystore",
      level: "Intermediate",
      english: "Generates a key pair and certificate entry for Tomcat HTTPS.",
      telugu: "Tomcat HTTPS కోసం key pair మరియు certificate entry generate చేస్తుంది."
    },
    {
      command: "keytool -exportcert -alias tomcat -keystore tomcat.keystore -file tomcat.cer",
      level: "Intermediate",
      english: "Exports a certificate from the Tomcat keystore.",
      telugu: "Tomcat keystore నుంచి certificate export చేస్తుంది."
    },
    {
      command: "openssl s_client -connect localhost:8443",
      level: "Intermediate",
      english: "Inspects the TLS connection to the Tomcat HTTPS connector.",
      telugu: "Tomcat HTTPS connector కి TLS connection inspect చేస్తుంది."
    },
    {
      command: "curl -k -I https://localhost:8443",
      level: "Intermediate",
      english: "Checks HTTPS response headers while skipping certificate verification.",
      telugu: "Certificate verification skip చేసి HTTPS response headers check చేస్తుంది."
    },
    {
      command: "curl -v http://localhost:8080",
      level: "Intermediate",
      english: "Displays detailed HTTP connection and response information.",
      telugu: "Detailed HTTP connection మరియు response information చూపిస్తుంది."
    },
    {
      command: "lsof -i :8080",
      level: "Intermediate",
      english: "Identifies the process using TCP port 8080.",
      telugu: "TCP port 8080 ఉపయోగిస్తున్న process గుర్తిస్తుంది."
    },
    {
      command: "fuser -n tcp 8080",
      level: "Intermediate",
      english: "Identifies processes accessing TCP port 8080.",
      telugu: "TCP port 8080 access చేస్తున్న processes గుర్తిస్తుంది."
    },
    {
      command: "jps -lv",
      level: "Intermediate",
      english: "Lists Java processes with their main classes and JVM arguments.",
      telugu: "Java processes ని main classes మరియు JVM arguments తో list చేస్తుంది."
    },
    {
      command: "jcmd -l",
      level: "Intermediate",
      english: "Lists running Java processes available to diagnostic tools.",
      telugu: "Diagnostic tools కి కనిపించే running Java processes list చేస్తుంది."
    },
    {
      command: "jstack <PID>",
      level: "Intermediate",
      english: "Generates a thread dump for a Java process.",
      telugu: "Java process కోసం thread dump generate చేస్తుంది."
    },
    {
      command: "jmap -heap <PID>",
      level: "Intermediate",
      english: "Displays heap configuration and usage information for a Java process.",
      telugu: "Java process heap configuration మరియు usage information చూపిస్తుంది."
    },
    {
      command: "jstat -gc <PID> 1000",
      level: "Intermediate",
      english: "Monitors Java garbage collection statistics every second.",
      telugu: "ప్రతి second Java garbage collection statistics monitor చేస్తుంది."
    },
    {
      command: "jcmd <PID> VM.version",
      level: "Intermediate",
      english: "Displays JVM version information for a running Tomcat process.",
      telugu: "Running Tomcat process కి సంబంధించిన JVM version చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.flags",
      level: "Intermediate",
      english: "Displays JVM flags used by the Tomcat process.",
      telugu: "Tomcat process ఉపయోగిస్తున్న JVM flags చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> Thread.print",
      level: "Intermediate",
      english: "Prints thread information for a running JVM.",
      telugu: "Running JVM లో thread information print చేస్తుంది."
    },
    {
      command: "jcmd <PID> GC.heap_info",
      level: "Intermediate",
      english: "Displays current Java heap information.",
      telugu: "Current Java heap information చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.system_properties",
      level: "Intermediate",
      english: "Displays system properties of the running Tomcat JVM.",
      telugu: "Running Tomcat JVM system properties చూపిస్తుంది."
    },
    {
      command: "jstat -class <PID> 1000",
      level: "Intermediate",
      english: "Monitors Java class loading statistics.",
      telugu: "Java class loading statistics monitor చేస్తుంది."
    },
    {
      command: "jstat -gcutil <PID> 1000",
      level: "Intermediate",
      english: "Monitors garbage collection utilization percentages.",
      telugu: "Garbage collection utilization percentages monitor చేస్తుంది."
    },
    {
      command: "find $CATALINA_HOME -name '*.jar'",
      level: "Intermediate",
      english: "Finds JAR libraries in the Tomcat installation.",
      telugu: "Tomcat installation లో JAR libraries కనుగొంటుంది."
    },
    {
      command: "find $CATALINA_HOME/logs -type f -mtime +7",
      level: "Intermediate",
      english: "Finds Tomcat log files older than seven days.",
      telugu: "ఏడు రోజుల కంటే పాత Tomcat log files కనుగొంటుంది."
    },
    {
      command: "find $CATALINA_HOME/temp -type f",
      level: "Intermediate",
      english: "Lists temporary files created by Tomcat.",
      telugu: "Tomcat create చేసిన temporary files list చేస్తుంది."
    },

    // ==================== ADVANCED - 50 ====================

    {
      command: "CATALINA_OPTS='-Xms512m -Xmx2048m' catalina.sh run",
      level: "Advanced",
      english: "Starts Tomcat with configured initial and maximum heap sizes.",
      telugu: "Configured initial మరియు maximum heap sizes తో Tomcat start చేస్తుంది."
    },
    {
      command: "JAVA_OPTS='-Djava.awt.headless=true' catalina.sh run",
      level: "Advanced",
      english: "Starts Tomcat with Java headless mode enabled.",
      telugu: "Java headless mode enable చేసి Tomcat start చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:+UseG1GC' catalina.sh run",
      level: "Advanced",
      english: "Starts Tomcat using the G1 garbage collector.",
      telugu: "G1 garbage collector ఉపయోగించి Tomcat start చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:+HeapDumpOnOutOfMemoryError' catalina.sh run",
      level: "Advanced",
      english: "Enables heap dump generation when an OutOfMemoryError occurs.",
      telugu: "OutOfMemoryError వచ్చినప్పుడు heap dump generate అయ్యేలా enable చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:HeapDumpPath=/var/log/tomcat' catalina.sh run",
      level: "Advanced",
      english: "Sets the directory used for JVM heap dump files.",
      telugu: "JVM heap dump files కోసం directory set చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-Xlog:gc*:file=/var/log/tomcat/gc.log:time,uptime' catalina.sh run",
      level: "Advanced",
      english: "Enables detailed garbage collection logging to a file.",
      telugu: "Garbage collection detailed logs ని file లో save చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:MaxMetaspaceSize=512m' catalina.sh run",
      level: "Advanced",
      english: "Sets the maximum Java Metaspace size.",
      telugu: "Maximum Java Metaspace size set చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:MetaspaceSize=128m' catalina.sh run",
      level: "Advanced",
      english: "Sets the initial threshold for Java Metaspace garbage collection.",
      telugu: "Java Metaspace garbage collection initial threshold set చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-XX:+UseStringDeduplication -XX:+UseG1GC' catalina.sh run",
      level: "Advanced",
      english: "Enables string deduplication with the G1 garbage collector.",
      telugu: "G1 garbage collector తో string deduplication enable చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-Dcom.sun.management.jmxremote' catalina.sh run",
      level: "Advanced",
      english: "Enables the JVM JMX remote management property.",
      telugu: "JVM JMX remote management property enable చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-Dcom.sun.management.jmxremote.port=9010' catalina.sh run",
      level: "Advanced",
      english: "Configures the JMX remote management port.",
      telugu: "JMX remote management port configure చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-Dcom.sun.management.jmxremote.authenticate=true' catalina.sh run",
      level: "Advanced",
      english: "Enables authentication for remote JMX connections.",
      telugu: "Remote JMX connections కోసం authentication enable చేస్తుంది."
    },
    {
      command: "CATALINA_OPTS='-Dcom.sun.management.jmxremote.ssl=true' catalina.sh run",
      level: "Advanced",
      english: "Enables SSL for remote JMX connections.",
      telugu: "Remote JMX connections కోసం SSL enable చేస్తుంది."
    },
    {
      command: "catalina.sh jpda start",
      level: "Advanced",
      english: "Starts Tomcat with remote Java debugging support.",
      telugu: "Remote Java debugging support తో Tomcat start చేస్తుంది."
    },
    {
      command: "JPDA_ADDRESS=*:8000 JPDA_TRANSPORT=dt_socket catalina.sh jpda start",
      level: "Advanced",
      english: "Configures the JPDA socket address and starts Tomcat in debug mode.",
      telugu: "JPDA socket address configure చేసి Tomcat debug mode లో start చేస్తుంది."
    },
    {
      command: "jcmd <PID> GC.heap_dump /tmp/tomcat-heap.hprof",
      level: "Advanced",
      english: "Creates a heap dump of the running Tomcat JVM.",
      telugu: "Running Tomcat JVM కి heap dump create చేస్తుంది."
    },
    {
      command: "jcmd <PID> GC.run",
      level: "Advanced",
      english: "Requests garbage collection in the target JVM.",
      telugu: "Target JVM లో garbage collection request చేస్తుంది."
    },
    {
      command: "jcmd <PID> VM.native_memory summary",
      level: "Advanced",
      english: "Displays native memory usage when Native Memory Tracking is enabled.",
      telugu: "Native Memory Tracking enable ఉన్నప్పుడు native memory usage చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.native_memory detail",
      level: "Advanced",
      english: "Displays detailed native memory tracking information.",
      telugu: "Detailed native memory tracking information చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> GC.class_histogram",
      level: "Advanced",
      english: "Displays a histogram of Java objects in the heap.",
      telugu: "Heap లోని Java objects histogram చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.uptime",
      level: "Advanced",
      english: "Displays the uptime of the running JVM.",
      telugu: "Running JVM ఎంతసేపటి నుంచి run అవుతుందో చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.command_line",
      level: "Advanced",
      english: "Displays the command line used to start the JVM.",
      telugu: "JVM start చేయడానికి ఉపయోగించిన command line చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.dynlibs",
      level: "Advanced",
      english: "Displays dynamic libraries loaded by the JVM.",
      telugu: "JVM load చేసిన dynamic libraries చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> VM.info",
      level: "Advanced",
      english: "Displays general diagnostic information about the JVM.",
      telugu: "JVM కి సంబంధించిన general diagnostic information చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> Compiler.queue",
      level: "Advanced",
      english: "Displays the JVM compiler queue.",
      telugu: "JVM compiler queue చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> Compiler.codecache",
      level: "Advanced",
      english: "Displays JIT compiler code cache information.",
      telugu: "JIT compiler code cache information చూపిస్తుంది."
    },
    {
      command: "jcmd <PID> Thread.print -l",
      level: "Advanced",
      english: "Prints a thread dump including synchronizer information.",
      telugu: "Synchronizer information తో thread dump print చేస్తుంది."
    },
    {
      command: "jmap -dump:format=b,file=/tmp/tomcat-heap.hprof <PID>",
      level: "Advanced",
      english: "Writes a binary heap dump for memory analysis.",
      telugu: "Memory analysis కోసం binary heap dump create చేస్తుంది."
    },
    {
      command: "jmap -histo:live <PID>",
      level: "Advanced",
      english: "Displays a histogram of live Java objects.",
      telugu: "Live Java objects histogram చూపిస్తుంది."
    },
    {
      command: "jstat -gccapacity <PID> 2000",
      level: "Advanced",
      english: "Monitors garbage collection memory capacity every two seconds.",
      telugu: "ప్రతి రెండు seconds కి garbage collection memory capacity monitor చేస్తుంది."
    },
    {
      command: "jstat -gccause <PID> 2000",
      level: "Advanced",
      english: "Displays garbage collection statistics and the latest GC cause.",
      telugu: "Garbage collection statistics మరియు latest GC cause చూపిస్తుంది."
    },
    {
      command: "jstat -compiler <PID> 2000",
      level: "Advanced",
      english: "Monitors Java JIT compiler statistics.",
      telugu: "Java JIT compiler statistics monitor చేస్తుంది."
    },
    {
      command: "jstat -printcompilation <PID> 2000",
      level: "Advanced",
      english: "Displays Java compilation activity.",
      telugu: "Java compilation activity చూపిస్తుంది."
    },
    {
      command: "keytool -importcert -alias company-ca -file company-ca.crt -keystore tomcat-truststore.jks",
      level: "Advanced",
      english: "Imports a trusted certificate into a Java truststore.",
      telugu: "Java truststore లో trusted certificate import చేస్తుంది."
    },
    {
      command: "keytool -delete -alias oldcert -keystore tomcat.keystore",
      level: "Advanced",
      english: "Deletes a certificate entry from a keystore.",
      telugu: "Keystore నుంచి certificate entry delete చేస్తుంది."
    },
    {
      command: "keytool -certreq -alias tomcat -keystore tomcat.keystore -file tomcat.csr",
      level: "Advanced",
      english: "Generates a certificate signing request for Tomcat.",
      telugu: "Tomcat కోసం certificate signing request generate చేస్తుంది."
    },
    {
      command: "keytool -importcert -alias tomcat -file signed-cert.crt -keystore tomcat.keystore",
      level: "Advanced",
      english: "Imports a signed certificate into the Tomcat keystore.",
      telugu: "Signed certificate ని Tomcat keystore లో import చేస్తుంది."
    },
    {
      command: "openssl x509 -in tomcat.crt -noout -text",
      level: "Advanced",
      english: "Displays detailed information from an X.509 certificate.",
      telugu: "X.509 certificate లోని detailed information చూపిస్తుంది."
    },
    {
      command: "openssl x509 -in tomcat.crt -noout -dates",
      level: "Advanced",
      english: "Displays the certificate validity start and expiry dates.",
      telugu: "Certificate validity start date మరియు expiry date చూపిస్తుంది."
    },
    {
      command: "openssl s_client -connect localhost:8443 -servername localhost",
      level: "Advanced",
      english: "Tests TLS connectivity using Server Name Indication.",
      telugu: "Server Name Indication ఉపయోగించి TLS connectivity test చేస్తుంది."
    },
    {
      command: "openssl s_client -connect localhost:8443 -showcerts",
      level: "Advanced",
      english: "Displays the certificate chain presented by Tomcat.",
      telugu: "Tomcat అందిస్తున్న certificate chain చూపిస్తుంది."
    },
    {
      command: "curl --resolve example.com:8443:127.0.0.1 https://example.com:8443",
      level: "Advanced",
      english: "Tests a Tomcat HTTPS virtual host using a custom address resolution.",
      telugu: "Custom address resolution తో Tomcat HTTPS virtual host test చేస్తుంది."
    },
    {
      command: "curl -w 'HTTP:%{http_code} TIME:%{time_total}\\n' -o /dev/null -s http://localhost:8080",
      level: "Advanced",
      english: "Measures HTTP response status and total request time.",
      telugu: "HTTP response status మరియు total request time measure చేస్తుంది."
    },
    {
      command: "ab -n 1000 -c 50 http://localhost:8080/",
      level: "Advanced",
      english: "Runs a basic concurrent HTTP benchmark against Tomcat.",
      telugu: "Tomcat పై basic concurrent HTTP benchmark run చేస్తుంది."
    },
    {
      command: "wrk -t4 -c100 -d30s http://localhost:8080/",
      level: "Advanced",
      english: "Runs a 30-second HTTP load test with multiple connections.",
      telugu: "Multiple connections తో 30 seconds HTTP load test run చేస్తుంది."
    },
    {
      command: "tcpdump -i any -nn port 8080",
      level: "Advanced",
      english: "Captures network packets associated with Tomcat HTTP traffic.",
      telugu: "Tomcat HTTP traffic కి సంబంధించిన network packets capture చేస్తుంది."
    },
    {
      command: "rsync -avz application.war deploy@server:/opt/tomcat/webapps/",
      level: "Advanced",
      english: "Transfers a WAR application to a remote Tomcat deployment directory.",
      telugu: "Remote Tomcat deployment directory కి WAR application transfer చేస్తుంది."
    },
    {
      command: "ansible all -m copy -a \"src=application.war dest=/opt/tomcat/webapps/application.war\"",
      level: "Advanced",
      english: "Deploys a WAR file to managed Tomcat servers using Ansible.",
      telugu: "Ansible ఉపయోగించి managed Tomcat servers లో WAR file deploy చేస్తుంది."
    },
    {
      command: "ansible all -m service -a \"name=tomcat state=restarted\" --become",
      level: "Advanced",
      english: "Restarts Tomcat across managed servers using Ansible.",
      telugu: "Ansible ద్వారా managed servers అన్నింటిలో Tomcat restart చేస్తుంది."
    },
    {
      command: "ansible all -m uri -a \"url=http://localhost:8080/myapp/ status_code=200\"",
      level: "Advanced",
      english: "Validates application availability across managed Tomcat hosts.",
      telugu: "Managed Tomcat hosts లో application availability validate చేస్తుంది."
    },

    // ==================== TROUBLESHOOTING - 60 ====================

    {
      command: "catalina.sh configtest",
      level: "Troubleshooting",
      english: "Checks Tomcat configuration syntax before startup.",
      telugu: "Startup ముందు Tomcat configuration syntax check చేస్తుంది."
    },
    {
      command: "catalina.sh run",
      level: "Troubleshooting",
      english: "Runs Tomcat in the foreground to inspect startup errors.",
      telugu: "Startup errors inspect చేయడానికి Tomcat ని foreground లో run చేస్తుంది."
    },
    {
      command: "tail -f $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Monitors Tomcat startup and runtime messages continuously.",
      telugu: "Tomcat startup మరియు runtime messages continuously monitor చేస్తుంది."
    },
    {
      command: "grep -n -i 'Address already in use' $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Finds port conflict errors in Tomcat logs.",
      telugu: "Tomcat logs లో port conflict errors కనుగొంటుంది."
    },
    {
      command: "ss -lntp | grep ':8080'",
      level: "Troubleshooting",
      english: "Checks which process is listening on Tomcat HTTP port 8080.",
      telugu: "Tomcat HTTP port 8080 పై ఏ process listen చేస్తుందో check చేస్తుంది."
    },
    {
      command: "lsof -nP -iTCP:8080 -sTCP:LISTEN",
      level: "Troubleshooting",
      english: "Identifies the process holding the Tomcat HTTP port.",
      telugu: "Tomcat HTTP port ని ఉపయోగిస్తున్న process గుర్తిస్తుంది."
    },
    {
      command: "curl -v --connect-timeout 5 http://localhost:8080",
      level: "Troubleshooting",
      english: "Diagnoses connection failures with a five-second timeout.",
      telugu: "Five-second timeout తో connection failures diagnose చేస్తుంది."
    },
    {
      command: "nc -vz localhost 8080",
      level: "Troubleshooting",
      english: "Tests whether the Tomcat HTTP port accepts TCP connections.",
      telugu: "Tomcat HTTP port TCP connections accept చేస్తుందో test చేస్తుంది."
    },
    {
      command: "systemctl status tomcat --no-pager -l",
      level: "Troubleshooting",
      english: "Displays detailed Tomcat service failure information.",
      telugu: "Tomcat service failure information detailed గా చూపిస్తుంది."
    },
    {
      command: "journalctl -xeu tomcat",
      level: "Troubleshooting",
      english: "Displays detailed systemd error messages for Tomcat.",
      telugu: "Tomcat కోసం detailed systemd error messages చూపిస్తుంది."
    },
    {
      command: "journalctl -u tomcat -p err",
      level: "Troubleshooting",
      english: "Filters Tomcat service logs to error priority messages.",
      telugu: "Tomcat service logs లో error priority messages మాత్రమే చూపిస్తుంది."
    },
    {
      command: "grep -n -i 'Permission denied' $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Finds permission-related failures in Tomcat logs.",
      telugu: "Tomcat logs లో permission-related failures కనుగొంటుంది."
    },
    {
      command: "namei -l $CATALINA_HOME/webapps",
      level: "Troubleshooting",
      english: "Checks ownership and permissions across the deployment path.",
      telugu: "Deployment path లోని ప్రతి directory ownership మరియు permissions check చేస్తుంది."
    },
    {
      command: "ls -ld $CATALINA_HOME $CATALINA_HOME/webapps",
      level: "Troubleshooting",
      english: "Checks Tomcat installation and deployment directory permissions.",
      telugu: "Tomcat installation మరియు deployment directory permissions check చేస్తుంది."
    },
    {
      command: "ps -o user,pid,ppid,cmd -C java",
      level: "Troubleshooting",
      english: "Checks the user and command line of Java processes.",
      telugu: "Java processes user మరియు command line details check చేస్తుంది."
    },
    {
      command: "pgrep -af catalina",
      level: "Troubleshooting",
      english: "Finds Tomcat Catalina processes and their startup arguments.",
      telugu: "Tomcat Catalina processes మరియు startup arguments కనుగొంటుంది."
    },
    {
      command: "jps -m",
      level: "Troubleshooting",
      english: "Lists Java processes and their main method arguments.",
      telugu: "Java processes మరియు main method arguments చూపిస్తుంది."
    },
    {
      command: "java -XshowSettings:properties -version",
      level: "Troubleshooting",
      english: "Displays Java system properties and runtime configuration.",
      telugu: "Java system properties మరియు runtime configuration చూపిస్తుంది."
    },
    {
      command: "readlink -f $(which java)",
      level: "Troubleshooting",
      english: "Finds the actual Java executable path.",
      telugu: "Actual Java executable path కనుగొంటుంది."
    },
    {
      command: "env | grep -E 'JAVA_HOME|CATALINA_HOME|CATALINA_BASE|JAVA_OPTS'",
      level: "Troubleshooting",
      english: "Checks important Tomcat and Java environment variables.",
      telugu: "Important Tomcat మరియు Java environment variables check చేస్తుంది."
    },
    {
      command: "grep -n 'JAVA_HOME' $CATALINA_HOME/bin/setclasspath.sh",
      level: "Troubleshooting",
      english: "Inspects how Tomcat resolves the Java installation path.",
      telugu: "Tomcat Java installation path ఎలా resolve చేస్తుందో inspect చేస్తుంది."
    },
    {
      command: "grep -n 'Connector' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Finds connector configuration entries in server.xml.",
      telugu: "server.xml లో connector configuration entries కనుగొంటుంది."
    },
    {
      command: "grep -n 'port=' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks configured Tomcat connector and shutdown ports.",
      telugu: "Configured Tomcat connector మరియు shutdown ports check చేస్తుంది."
    },
    {
      command: "grep -n 'redirectPort' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks HTTPS redirect port settings.",
      telugu: "HTTPS redirect port settings check చేస్తుంది."
    },
    {
      command: "grep -n 'maxThreads\\|minSpareThreads' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Inspects Tomcat connector thread pool settings.",
      telugu: "Tomcat connector thread pool settings inspect చేస్తుంది."
    },
    {
      command: "grep -n 'connectionTimeout' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks configured connector connection timeout values.",
      telugu: "Configured connector connection timeout values check చేస్తుంది."
    },
    {
      command: "grep -n 'URIEncoding' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks URI character encoding settings.",
      telugu: "URI character encoding settings check చేస్తుంది."
    },
    {
      command: "grep -n 'maxPostSize' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks the configured maximum POST request size.",
      telugu: "Configured maximum POST request size check చేస్తుంది."
    },
    {
      command: "grep -n 'maxSwallowSize' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks the maximum request body size Tomcat will swallow.",
      telugu: "Tomcat swallow చేసే maximum request body size check చేస్తుంది."
    },
    {
      command: "grep -n 'deployOnStartup\\|autoDeploy' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks automatic application deployment settings.",
      telugu: "Automatic application deployment settings check చేస్తుంది."
    },
    {
      command: "grep -n 'unpackWARs' $CATALINA_HOME/conf/server.xml",
      level: "Troubleshooting",
      english: "Checks whether Tomcat extracts deployed WAR files.",
      telugu: "Deploy చేసిన WAR files ని Tomcat extract చేస్తుందో check చేస్తుంది."
    },
    {
      command: "find $CATALINA_HOME/webapps -maxdepth 2 -type d",
      level: "Troubleshooting",
      english: "Inspects deployed application directory structure.",
      telugu: "Deployed application directory structure inspect చేస్తుంది."
    },
    {
      command: "find $CATALINA_HOME/webapps -name '*.war' -printf '%f %s bytes\\n'",
      level: "Troubleshooting",
      english: "Displays deployed WAR filenames and their sizes.",
      telugu: "Deployed WAR filenames మరియు sizes చూపిస్తుంది."
    },
    {
      command: "unzip -t $CATALINA_HOME/webapps/application.war",
      level: "Troubleshooting",
      english: "Checks whether a deployed WAR archive is corrupted.",
      telugu: "Deploy చేసిన WAR archive corrupt అయిందో లేదో check చేస్తుంది."
    },
    {
      command: "jar tf $CATALINA_HOME/webapps/application.war | grep 'WEB-INF/classes'",
      level: "Troubleshooting",
      english: "Checks whether compiled application classes exist in the WAR.",
      telugu: "WAR లో compiled application classes ఉన్నాయో check చేస్తుంది."
    },
    {
      command: "grep -n -i 'Context startup failed' $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Finds application context startup failures.",
      telugu: "Application context startup failures కనుగొంటుంది."
    },
    {
      command: "grep -n -i 'Deployment of web application' $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Finds application deployment messages in Tomcat logs.",
      telugu: "Tomcat logs లో application deployment messages కనుగొంటుంది."
    },
    {
      command: "grep -n -i 'Failed to start component' $CATALINA_HOME/logs/catalina.out",
      level: "Troubleshooting",
      english: "Finds Tomcat component startup failures.",
      telugu: "Tomcat component startup failures కనుగొంటుంది."
    },
    {
      command: "grep -n -i 'SEVERE' $CATALINA_HOME/logs/localhost.*.log",
      level: "Troubleshooting",
      english: "Searches application-specific Tomcat logs for severe errors.",
      telugu: "Application-specific Tomcat logs లో severe errors search చేస్తుంది."
    },
    {
      command: "grep -n -i 'OutOfMemoryError' $CATALINA_HOME/logs/*.log",
      level: "Troubleshooting",
      english: "Searches all Tomcat log files for JVM memory errors.",
      telugu: "అన్ని Tomcat log files లో JVM memory errors search చేస్తుంది."
    },
    {
      command: "free -h",
      level: "Troubleshooting",
      english: "Checks available system memory when Tomcat performance degrades.",
      telugu: "Tomcat performance తగ్గినప్పుడు available system memory check చేస్తుంది."
    },
    {
      command: "top -H -p <PID>",
      level: "Troubleshooting",
      english: "Displays CPU and memory usage for individual Tomcat threads.",
      telugu: "Tomcat individual threads CPU మరియు memory usage చూపిస్తుంది."
    },
    {
      command: "ps -p <PID> -o %cpu,%mem,rss,vsz,etime,cmd",
      level: "Troubleshooting",
      english: "Checks Tomcat process CPU, memory, and runtime details.",
      telugu: "Tomcat process CPU, memory మరియు runtime details check చేస్తుంది."
    },
    {
      command: "jcmd <PID> GC.heap_info",
      level: "Troubleshooting",
      english: "Inspects JVM heap usage when memory problems occur.",
      telugu: "Memory problems వచ్చినప్పుడు JVM heap usage inspect చేస్తుంది."
    },
    {
      command: "jcmd <PID> Thread.print",
      level: "Troubleshooting",
      english: "Captures thread information to investigate stuck requests.",
      telugu: "Stuck requests investigate చేయడానికి thread information capture చేస్తుంది."
    },
    {
      command: "jstack -l <PID>",
      level: "Troubleshooting",
      english: "Captures thread stacks and lock information for deadlock analysis.",
      telugu: "Deadlock analysis కోసం thread stacks మరియు lock information capture చేస్తుంది."
    },
    {
      command: "jstat -gcutil <PID> 1000 10",
      level: "Troubleshooting",
      english: "Monitors garbage collection utilization for ten samples.",
      telugu: "Ten samples కోసం garbage collection utilization monitor చేస్తుంది."
    },
    {
      command: "jcmd <PID> VM.flags",
      level: "Troubleshooting",
      english: "Checks JVM startup flags when memory settings are incorrect.",
      telugu: "Memory settings తప్పుగా ఉన్నప్పుడు JVM startup flags check చేస్తుంది."
    },
    {
      command: "df -h $CATALINA_HOME",
      level: "Troubleshooting",
      english: "Checks disk capacity on the Tomcat installation filesystem.",
      telugu: "Tomcat installation filesystem disk capacity check చేస్తుంది."
    },
    {
      command: "df -i $CATALINA_HOME",
      level: "Troubleshooting",
      english: "Checks inode availability on the Tomcat filesystem.",
      telugu: "Tomcat filesystem లో inode availability check చేస్తుంది."
    },
    {
      command: "du -sh $CATALINA_HOME/logs",
      level: "Troubleshooting",
      english: "Checks how much disk space Tomcat logs consume.",
      telugu: "Tomcat logs ఎంత disk space ఉపయోగిస్తున్నాయో check చేస్తుంది."
    },
    {
      command: "find $CATALINA_HOME/logs -type f -size +100M",
      level: "Troubleshooting",
      english: "Finds Tomcat log files larger than 100 MB.",
      telugu: "100 MB కంటే పెద్ద Tomcat log files కనుగొంటుంది."
    },
    {
      command: "find $CATALINA_HOME/logs -type f -mtime +30",
      level: "Troubleshooting",
      english: "Finds log files that have not been modified for more than 30 days.",
      telugu: "30 రోజుల కంటే ఎక్కువగా modify కాని log files కనుగొంటుంది."
    },
    {
      command: "openssl s_client -connect localhost:8443 -servername localhost -brief",
      level: "Troubleshooting",
      english: "Checks the TLS handshake and negotiated protocol details.",
      telugu: "TLS handshake మరియు negotiated protocol details check చేస్తుంది."
    },
    {
      command: "openssl x509 -in tomcat.crt -noout -checkend 2592000",
      level: "Troubleshooting",
      english: "Checks whether a certificate expires within the next 30 days.",
      telugu: "తదుపరి 30 రోజుల్లో certificate expire అవుతుందో check చేస్తుంది."
    },
    {
      command: "curl -k -v https://localhost:8443",
      level: "Troubleshooting",
      english: "Inspects HTTPS connection details while ignoring certificate verification.",
      telugu: "Certificate verification ignore చేసి HTTPS connection details inspect చేస్తుంది."
    },
    {
      command: "keytool -list -v -keystore tomcat.keystore -alias tomcat",
      level: "Troubleshooting",
      english: "Inspects the Tomcat certificate entry and its validity details.",
      telugu: "Tomcat certificate entry మరియు validity details inspect చేస్తుంది."
    },
    {
      command: "getent hosts localhost",
      level: "Troubleshooting",
      english: "Checks local hostname resolution.",
      telugu: "Local hostname resolution check చేస్తుంది."
    },
    {
      command: "ip route",
      level: "Troubleshooting",
      english: "Displays network routes when remote clients cannot reach Tomcat.",
      telugu: "Remote clients Tomcat ని reach చేయలేనప్పుడు network routes చూపిస్తుంది."
    },
    {
      command: "firewall-cmd --list-ports",
      level: "Troubleshooting",
      english: "Checks ports allowed by firewalld.",
      telugu: "Firewalld allow చేసిన ports check చేస్తుంది."
    },
    {
      command: "iptables -L -n -v",
      level: "Troubleshooting",
      english: "Inspects firewall rules and packet counters.",
      telugu: "Firewall rules మరియు packet counters inspect చేస్తుంది."
    },
    {
      command: "getenforce",
      level: "Troubleshooting",
      english: "Checks whether SELinux is enforcing security policies.",
      telugu: "SELinux security policies enforce చేస్తుందో check చేస్తుంది."
    },
    {
      command: "ausearch -m AVC -ts recent",
      level: "Troubleshooting",
      english: "Searches recent SELinux access denial events.",
      telugu: "Recent SELinux access denial events search చేస్తుంది."
    },
    {
      command: "curl -s -o /dev/null -w '%{http_code}\\n' http://localhost:8080/manager/html",
      level: "Troubleshooting",
      english: "Checks the HTTP status code returned by the Tomcat Manager page.",
      telugu: "Tomcat Manager page return చేసిన HTTP status code check చేస్తుంది."
    },
    {
      command: "curl -s -o /dev/null -w '%{http_code}\\n' http://localhost:8080/myapp/",
      level: "Troubleshooting",
      english: "Checks the HTTP status code of a deployed application.",
      telugu: "Deploy అయిన application HTTP status code check చేస్తుంది."
    },
    {
      command: "curl -s -o /dev/null -w '%{time_connect} %{time_starttransfer} %{time_total}\\n' http://localhost:8080/",
      level: "Troubleshooting",
      english: "Measures connection, first-byte, and total response times.",
      telugu: "Connection, first-byte మరియు total response times measure చేస్తుంది."
    },
    {
      command: "curl -H 'Host: example.com' -I http://127.0.0.1:8080/",
      level: "Troubleshooting",
      english: "Tests a virtual host using a custom HTTP Host header.",
      telugu: "Custom HTTP Host header ఉపయోగించి virtual host test చేస్తుంది."
    },
    {
      command: "curl -X OPTIONS -i http://localhost:8080/myapp/",
      level: "Troubleshooting",
      english: "Checks HTTP OPTIONS handling for a deployed application.",
      telugu: "Deploy అయిన application లో HTTP OPTIONS handling check చేస్తుంది."
    },
    {
      command: "curl -X HEAD -I http://localhost:8080/myapp/",
      level: "Troubleshooting",
      english: "Tests whether an application responds to HTTP HEAD requests.",
      telugu: "Application HTTP HEAD requests కి response ఇస్తుందో test చేస్తుంది."
    },
    {
      command: "systemctl show tomcat -p MainPID -p ExecStart -p User",
      level: "Troubleshooting",
      english: "Displays the Tomcat service process ID, startup command, and service user.",
      telugu: "Tomcat service process ID, startup command మరియు service user చూపిస్తుంది."
    }
  ]
};
