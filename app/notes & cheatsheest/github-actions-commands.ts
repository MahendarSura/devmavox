
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

export const githubActionsTool: DevOpsTool = {
  name: "GitHub Actions",
  category: "CI/CD & Automation",
  commands: [
    // BASIC - 8
    ...makeCommands("Basic", [
      [
        'echo "::debug::Build process started"',
        "Writes a debug message to the workflow log.",
        "Workflow log lo debug message print chestundi.",
      ],
      [
        'echo "::notice::Build completed"',
        "Creates a notice annotation in the workflow log.",
        "Workflow log lo notice annotation create chestundi.",
      ],
      [
        'echo "::warning::Check the configuration"',
        "Creates a warning annotation in the workflow log.",
        "Workflow log lo warning annotation create chestundi.",
      ],
      [
        'echo "::error::Build failed"',
        "Creates an error annotation in the workflow log.",
        "Workflow log lo error annotation create chestundi.",
      ],
      [
        'echo "APP_ENV=production" >> "$GITHUB_ENV"',
        "Sets an environment variable for subsequent steps in the job.",
        "Job lo subsequent steps kosam environment variable set chestundi.",
      ],
      [
        'echo "build_version=1.0.0" >> "$GITHUB_OUTPUT"',
        "Sets an output value that subsequent steps can access.",
        "Subsequent steps access cheyagalige output value set chestundi.",
      ],
      [
        'echo "$HOME/.local/bin" >> "$GITHUB_PATH"',
        "Adds a directory to PATH for subsequent workflow steps.",
        "Subsequent workflow steps kosam PATH ki directory add chestundi.",
      ],
      [
        'echo "## Build Summary" >> "$GITHUB_STEP_SUMMARY"',
        "Adds a heading to the workflow job summary.",
        "Workflow job summary lo heading add chestundi.",
      ],
    ]),

    // INTERMEDIATE - 6
    ...makeCommands("Intermediate", [
      [
        'echo "::group::Build Logs"',
        "Starts a collapsible group in workflow logs.",
        "Workflow logs lo collapsible group start chestundi.",
      ],
      [
        'echo "::endgroup::"',
        "Ends the current workflow log group.",
        "Current workflow log group close chestundi.",
      ],
      [
        'echo "::add-mask::$TOKEN"',
        "Masks the specified value in workflow logs.",
        "Specified value ni workflow logs lo mask chestundi.",
      ],
      [
        'echo "::error file=src/app.ts,line=10,title=Build Error::Missing dependency"',
        "Creates an error annotation linked to a file and line.",
        "File mariyu line ki link ayina error annotation create chestundi.",
      ],
      [
        'echo "::warning file=src/app.ts,line=10,title=Code Warning::Deprecated API used"',
        "Creates a warning annotation linked to a source file and line.",
        "Source file mariyu line ki link ayina warning annotation create chestundi.",
      ],
      [
        '{ echo "report<<EOF"; cat report.txt; echo "EOF"; } >> "$GITHUB_OUTPUT"',
        "Writes a multiline output value for subsequent workflow steps.",
        "Subsequent workflow steps kosam multiline output value write chestundi.",
      ],
    ]),

    // ADVANCED - 5
    ...makeCommands("Advanced", [
      [
        'echo "::echo::on"',
        "Enables command echoing in the workflow log.",
        "Workflow log lo command echoing enable chestundi.",
      ],
      [
        'echo "::echo::off"',
        "Disables command echoing in the workflow log.",
        "Workflow log lo command echoing disable chestundi.",
      ],
      [
        'echo "action_state=prepared" >> "$GITHUB_STATE"',
        "Saves state for use by the post phase of an action.",
        "Action post phase lo use cheyadaniki state save chestundi.",
      ],
      [
        'echo "### Test Results" >> "$GITHUB_STEP_SUMMARY"',
        "Adds a Markdown section to the workflow job summary.",
        "Workflow job summary lo Markdown section add chestundi.",
      ],
      [
        'printf "BUILD_STATUS=%s\\n" "success" >> "$GITHUB_OUTPUT"',
        "Writes a formatted output value to the workflow output file.",
        "Workflow output file lo formatted output value write chestundi.",
      ],
    ]),

    // TROUBLESHOOTING - 6
    ...makeCommands("Troubleshooting", [
      [
        'test -f "$GITHUB_ENV" || { echo "::error::GITHUB_ENV file missing"; exit 1; }',
        "Checks whether the environment file is available.",
        "Environment file available ga undo check chestundi.",
      ],
      [
        'test -f "$GITHUB_OUTPUT" || { echo "::error::GITHUB_OUTPUT file missing"; exit 1; }',
        "Checks whether the step output file is available.",
        "Step output file available ga undo check chestundi.",
      ],
      [
        'test -d "$GITHUB_WORKSPACE" || { echo "::error::Workspace missing"; exit 1; }',
        "Checks whether the GitHub Actions workspace directory exists.",
        "GitHub Actions workspace directory undho ledo check chestundi.",
      ],
      [
        'test -n "${GITHUB_REF:-}" || { echo "::error::GITHUB_REF is empty"; exit 1; }',
        "Checks whether the workflow reference variable is populated.",
        "Workflow reference variable value undho ledo check chestundi.",
      ],
      [
        'test -n "${GITHUB_SHA:-}" || { echo "::error::GITHUB_SHA is empty"; exit 1; }',
        "Checks whether the commit SHA variable is populated.",
        "Commit SHA variable value undho ledo check chestundi.",
      ],
      [
        'printf "Runner OS: %s\\nRunner Architecture: %s\\n" "$RUNNER_OS" "$RUNNER_ARCH"',
        "Displays runner operating system and architecture for diagnostics.",
        "Diagnostics kosam runner OS mariyu architecture chupistundi.",
      ],
    ]),
  ],
};
