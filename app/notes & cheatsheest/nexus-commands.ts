
import type { DevOpsTool } from "./command-types";

type CommandLevel = DevOpsTool["commands"][number]["level"];

const makeCommands = (
  level: CommandLevel,
  rows: [string, string, string][]
) =>
  rows.map(([command, english, telugu]) => ({
    command,
    level,
    english,
    telugu,
  }));

export const nexusTool: DevOpsTool = {
  name: "Nexus",
  category: "Automation & Build",

  commands: [
    // BASIC - 16
    ...makeCommands("Basic", [
      ["curl -I <nexus-url>", "Check whether the Nexus endpoint responds.", "Nexus URL response istundo check cheyyataniki."],
      ["curl -sS -I http://localhost:8081/", "Check whether the Nexus web endpoint responds.", "Nexus web endpoint response check cheyyataniki."],
      ["curl http://localhost:8081/service/rest/v1/status", "Check whether Nexus is ready for read operations.", "Nexus read operations ki ready ga undo check cheyyataniki."],
      ["curl http://localhost:8081/service/rest/v1/status/writable", "Check whether Nexus is ready for write operations.", "Nexus write operations ki ready ga undo check cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/status/check", "Retrieve detailed Nexus system status checks.", "Nexus system status checks details chudataniki."],
      ["curl http://localhost:8081/service/rest/swagger.json", "Retrieve the Nexus REST API specification.", "Nexus REST API specification chudataniki."],
      ["sudo systemctl status nexus", "Check the Nexus system service on systemd hosts.", "Nexus system service status chudataniki."],
      ["df -h", "Check filesystem capacity for Nexus storage.", "Nexus storage disk space check cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/repositories", "List repositories configured in Nexus.", "Nexus repositories list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/repositories/maven-releases", "Retrieve details of a specific repository.", "Specific repository details chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/repositorySettings", "List repository settings.", "Repository settings chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/search", "Search for components in Nexus.", "Nexus lo components search cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/components?repository=maven-releases", "List components stored in a repository.", "Repository lo unna components list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/assets?repository=maven-releases", "List assets stored in a repository.", "Repository assets list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/tasks", "List configured Nexus scheduled tasks.", "Nexus scheduled tasks list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" http://localhost:8081/service/rest/v1/security/users", "List Nexus users.", "Nexus users list chudataniki."],
    ]),

    // INTERMEDIATE - 23
    ...makeCommands("Intermediate", [
      ["curl -G -u \"$NEXUS_USER:$NEXUS_PASSWORD\" --data-urlencode \"repository=maven-releases\" --data-urlencode \"group=com.example\" --data-urlencode \"name=my-app\" \"$NEXUS_URL/service/rest/v1/search\"", "Search for a component by repository, group, and name.", "Repository, group, name use chesi component search cheyyataniki."],
      ["curl -G -u \"$NEXUS_USER:$NEXUS_PASSWORD\" --data-urlencode \"repository=maven-releases\" --data-urlencode \"group=com.example\" --data-urlencode \"name=my-app\" \"$NEXUS_URL/service/rest/v1/search/assets\"", "Search assets using component coordinates.", "Component coordinates use chesi assets search cheyyataniki."],
      ["curl -G -u \"$NEXUS_USER:$NEXUS_PASSWORD\" --data-urlencode \"repository=maven-releases\" --data-urlencode \"name=my-app\" \"$NEXUS_URL/service/rest/v1/search/versions\"", "List available versions of a component.", "Component available versions list chudataniki."],
      ["curl -G -u \"$NEXUS_USER:$NEXUS_PASSWORD\" --data-urlencode \"repository=maven-releases\" --data-urlencode \"name=my-app\" \"$NEXUS_URL/service/rest/v1/search/suggest\"", "Get search suggestions for repository components.", "Repository components search suggestions pondataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/components?repository=maven-releases&continuationToken=TOKEN\"", "Retrieve the next page of component results.", "Continuation token tho next components page chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/assets?repository=maven-releases&continuationToken=TOKEN\"", "Retrieve the next page of asset results.", "Continuation token tho next assets page chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/components/COMPONENT_ID\"", "Retrieve details of a component by its ID.", "Component ID tho component details chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/assets/ASSET_ID\"", "Retrieve details of an asset by its ID.", "Asset ID tho asset details chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-releases/browse\"", "Browse repository contents.", "Repository contents browse cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-releases/browse?continuationToken=TOKEN\"", "Continue browsing repository contents.", "Repository browsing continue cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-proxy/invalidate-cache\"", "Invalidate a proxy or group repository cache.", "Proxy or group repository cache invalidate cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-releases/rebuild-index\"", "Schedule a repository search-index rebuild.", "Repository search index rebuild schedule cheyyataniki."],
      ["curl -G -u \"$NEXUS_USER:$NEXUS_PASSWORD\" --data-urlencode \"type=assetBlob.cleanup\" \"$NEXUS_URL/service/rest/v1/tasks\"", "Filter scheduled tasks by task type.", "Task type use chesi scheduled tasks filter cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/roles/assignable\"", "List roles that can be assigned to users.", "Users ki assign cheyyagalige roles list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/roles/ROLE_ID\"", "Retrieve details of a security role.", "Security role details chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/script\"", "List stored Nexus scripts.", "Nexus stored scripts list chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/script/SCRIPT_NAME\"", "Retrieve a stored script source.", "Stored script source chudataniki."],
      ["du -sh /nexus-data", "Estimate the size of the Nexus data directory.", "Nexus data directory size chudataniki."],
      ["curl -sS -u '<user>:<token>' 'http://localhost:8081/service/rest/v1/blobstores'", "List configured blob stores.", "Configured blob stores list chudataniki."],
      ["curl -sS -u '<user>:<token>' 'http://localhost:8081/service/rest/v1/repositories/maven/hosted'", "List hosted Maven repositories.", "Hosted Maven repositories list chudataniki."],
      ["curl -sS -u '<user>:<token>' 'http://localhost:8081/service/rest/v1/repositories/maven/proxy'", "List Maven proxy repositories.", "Maven proxy repositories list chudataniki."],
      ["curl -sS -u '<user>:<token>' 'http://localhost:8081/service/rest/v1/repositories/docker/hosted'", "List hosted Docker repositories.", "Hosted Docker repositories list chudataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/atlassian-crowd/clear-cache\"", "Clear the configured Atlassian Crowd authentication cache.", "Atlassian Crowd authentication cache clear cheyyataniki."],
    ]),

    // ADVANCED - 21
    ...makeCommands("Advanced", [
      ["curl -I <repository-url>", "Inspect repository endpoint response headers.", "Repository endpoint response headers chudataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"accept: application/json\" -F \"maven2.groupId=com.example\" -F \"maven2.artifactId=my-app\" -F \"maven2.version=1.0.0\" -F \"maven2.asset1=@app.jar\" -F \"maven2.asset1.extension=jar\" \"$NEXUS_URL/service/rest/v1/components?repository=maven-releases\"", "Upload a Maven component and JAR asset.", "Maven component mariyu JAR asset upload cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"accept: application/json\" -F \"raw.directory=artifacts\" -F \"raw.asset1=@app.zip\" -F \"raw.asset1.filename=app.zip\" \"$NEXUS_URL/service/rest/v1/components?repository=raw-hosted\"", "Upload a file as a raw repository component.", "File ni raw repository component ga upload cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"cleanup-script\",\"type\":\"groovy\",\"content\":\"log.info(\\\"Nexus script\\\")\"}' \"$NEXUS_URL/service/rest/v1/script\"", "Create a stored Groovy script in Nexus.", "Nexus lo stored Groovy script create cheyyataniki."],
      ["curl -X PUT -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"cleanup-script\",\"type\":\"groovy\",\"content\":\"log.info(\\\"Updated script\\\")\"}' \"$NEXUS_URL/service/rest/v1/script/cleanup-script\"", "Update an existing stored script.", "Existing stored script update cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/script/cleanup-script/run\"", "Execute a stored Nexus script.", "Stored Nexus script execute cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"manual-cleanup\",\"type\":\"tags.cleanup\",\"enabled\":true}' \"$NEXUS_URL/service/rest/v1/tasks\"", "Create a scheduled task using the Tasks API.", "Tasks API tho scheduled task create cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"devops-role\",\"description\":\"DevOps team role\",\"privileges\":[\"nx-repository-view-maven2-maven-releases-browse\"],\"roles\":[]}' \"$NEXUS_URL/service/rest/v1/security/roles\"", "Create a security role with selected privileges.", "Selected privileges tho security role create cheyyataniki."],
      ["curl -X PUT -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"devops-role\",\"description\":\"Updated DevOps role\",\"privileges\":[\"nx-repository-view-maven2-maven-releases-browse\"],\"roles\":[]}' \"$NEXUS_URL/service/rest/v1/security/roles/devops-role\"", "Update an existing Nexus security role.", "Existing Nexus security role update cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"name\":\"devops-user\",\"firstName\":\"DevOps\",\"lastName\":\"User\",\"emailAddress\":\"devops@example.com\",\"password\":\"CHANGE_ME\",\"status\":\"active\",\"roles\":[\"devops-role\"]}' \"$NEXUS_URL/service/rest/v1/security/users\"", "Create a Nexus user and assign a role.", "Nexus user create chesi role assign cheyyataniki."],
      ["curl -X PUT -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{\"status\":\"disabled\"}' \"$NEXUS_URL/service/rest/v1/security/users/devops-user\"", "Update a Nexus user account.", "Nexus user account update cheyyataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/recovery-mode\"", "Enable Nexus recovery mode.", "Nexus recovery mode enable cheyyataniki."],
      ["curl -X DELETE -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/recovery-mode\"", "Disable Nexus recovery mode.", "Nexus recovery mode disable cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan\"", "List available Nexus reconciliation plans.", "Nexus reconciliation plans list chudataniki."],
      ["curl -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" -H \"Content-Type: application/json\" -d '{}' \"$NEXUS_URL/service/rest/v1/plan\"", "Create a reconciliation plan.", "Reconciliation plan create cheyyataniki."],
      ["curl -X PUT -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan\"", "Execute pending reconciliation plans.", "Pending reconciliation plans execute cheyyataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan/summary\"", "Retrieve a reconciliation plan summary.", "Reconciliation plan summary chudataniki."],
      ["curl -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan/PLAN_ID\"", "Retrieve a specific reconciliation plan.", "Specific reconciliation plan details chudataniki."],
      ["curl -X PUT -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan/PLAN_ID\"", "Execute a specific reconciliation plan.", "Specific reconciliation plan execute cheyyataniki."],
      ["curl -X DELETE -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan/PLAN_ID\"", "Delete a specific reconciliation plan.", "Specific reconciliation plan delete cheyyataniki."],
      ["curl -X DELETE -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/plan\"", "Delete non-executed reconciliation plans.", "Execute avvani reconciliation plans delete cheyyataniki."],
    ]),

    // TROUBLESHOOTING - 22
    ...makeCommands("Troubleshooting", [
      ["curl -sS -o /dev/null -w '%{http_code}\\n' <nexus-url>", "Inspect the HTTP response code from Nexus.", "Nexus HTTP response code check cheyyataniki."],
      ["curl -sS -o /dev/null -w '%{http_code}\\n' http://localhost:8081/", "Print only the HTTP status code returned by Nexus.", "Nexus HTTP status code quick ga chudataniki."],
      ["curl -sS -u '<user>:<password>' http://localhost:8081/service/rest/v1/status", "Check Nexus Repository Manager status.", "Nexus service status verify cheyyataniki."],
      ["sudo journalctl -u nexus -n 100 --no-pager", "Inspect recent Nexus service logs.", "Nexus recent service logs inspect cheyyataniki."],
      ["curl -i http://localhost:8081/service/rest/v1/status", "Inspect the HTTP response from the Nexus status endpoint.", "Nexus status endpoint HTTP response inspect cheyyataniki."],
      ["curl -i http://localhost:8081/service/rest/v1/status/writable", "Check whether Nexus is responding but not writable.", "Nexus write operations allow chestundo ledo check cheyyataniki."],
      ["curl -v -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories\"", "Debug repository API connection and authentication.", "Repository API connection mariyu authentication debug cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-releases\"", "Inspect repository lookup status and HTTP errors.", "Repository lookup status mariyu HTTP errors inspect cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/search?repository=maven-releases\"", "Troubleshoot repository search failures.", "Repository search failures troubleshoot cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/components?repository=maven-releases\"", "Check component listing errors and repository permissions.", "Component listing errors mariyu permissions check cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/assets?repository=maven-releases\"", "Troubleshoot asset listing and access failures.", "Asset listing mariyu access failures troubleshoot cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/users\"", "Check user-list API access and authentication.", "User-list API access mariyu authentication check cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/roles\"", "Check access to Nexus role information.", "Nexus role information access check cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/tasks\"", "Investigate task API access and listing problems.", "Task API access mariyu listing problems investigate cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/script\"", "Check stored-script API availability and permissions.", "Stored-script API availability mariyu permissions check cheyyataniki."],
      ["curl -i -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-proxy/invalidate-cache\"", "Check proxy-cache invalidation errors.", "Proxy cache invalidation errors check cheyyataniki."],
      ["curl -i -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositories/maven-releases/rebuild-index\"", "Inspect repository index rebuild failures.", "Repository index rebuild failures inspect cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/components/COMPONENT_ID\"", "Check whether a component exists and is accessible.", "Component exist avuthundo, access undho check cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/assets/ASSET_ID\"", "Check whether an asset exists and is accessible.", "Asset exist avuthundo, access undho check cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/status/check\"", "Inspect detailed system health-check responses.", "Detailed system health-check responses inspect cheyyataniki."],
      ["curl -i -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/repositorySettings\"", "Investigate repository configuration problems.", "Repository configuration problems investigate cheyyataniki."],
      ["curl -i -X POST -u \"$NEXUS_USER:$NEXUS_PASSWORD\" \"$NEXUS_URL/service/rest/v1/security/atlassian-crowd/verify-connection\" -H \"Content-Type: application/json\" -d '{}'", "Check Atlassian Crowd connection verification errors.", "Atlassian Crowd connection verification errors check cheyyataniki."],
    ]),
  ],
};
