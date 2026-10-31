
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

export const pythonTool: DevOpsTool = {
  name: "Python",
  category: "Programming & Automation",
  commands: [
    ...makeCommands("Basic", [
      [
        "python --version",
        "Display the installed Python version.",
        "Install ayina Python version chudataniki use chestaru.",
      ],
      [
        "python --help",
        "Display Python interpreter command-line options.",
        "Python commands and options help chudataniki use chestaru.",
      ],
      [
        "python",
        "Start the interactive Python interpreter.",
        "Python interactive mode open cheyadaniki use chestaru.",
      ],
      [
        "python app.py",
        "Execute a Python script.",
        "Python script run cheyadaniki use chestaru.",
      ],
      [
        "python -c \"print('Hello, Python')\"",
        "Execute Python code directly from the command line.",
        "File create cheyakunda direct ga Python code run chestaru.",
      ],
      [
        "python -m pip --version",
        "Display the installed pip version.",
        "Python package manager pip version chudataniki use chestaru.",
      ],
      [
        "python -m pip install requests",
        "Install the requests Python package.",
        "Requests package install cheyadaniki use chestaru.",
      ],
      [
        "python -m pip list",
        "List installed Python packages.",
        "Install ayina Python packages list chudataniki use chestaru.",
      ],
      [
        "python -m pip show requests",
        "Display information about an installed package.",
        "Requests package details chudataniki use chestaru.",
      ],
      [
        "python -m pip freeze",
        "Display installed packages in requirements-file format.",
        "Installed packages and versions list generate cheyadaniki use chestaru.",
      ],
      [
        "python -m venv .venv",
        "Create a virtual environment in the .venv directory.",
        "Project kosam separate Python virtual environment create chestaru.",
      ],
      [
        "python -m http.server 8000",
        "Start a basic HTTP server on port 8000.",
        "Current folder files ni port 8000 lo serve cheyadaniki use chestaru.",
      ],
    ]),

    ...makeCommands("Intermediate", [
      [
        "python -m pip install -r requirements.txt",
        "Install packages listed in a requirements file.",
        "Requirements file lo unna packages anni install chestaru.",
      ],
      [
        "python -m pip uninstall requests",
        "Uninstall a Python package.",
        "Python package remove cheyadaniki use chestaru.",
      ],
      [
        "python -m pip install --upgrade requests",
        "Upgrade an installed Python package.",
        "Package ni latest available version ki upgrade chestaru.",
      ],
      [
        "python -m pip check",
        "Check installed packages for broken dependencies.",
        "Packages madhya dependency conflicts unnayo ledo check chestaru.",
      ],
      [
        "python -m pip download requests",
        "Download a package without installing it.",
        "Package ni install cheyakunda download chestaru.",
      ],
      [
        "python -m pip wheel .",
        "Build a wheel distribution for the current project.",
        "Current Python project ki wheel package build chestaru.",
      ],
      [
        ".venv\\Scripts\\Activate.ps1",
        "Activate a virtual environment in Windows PowerShell.",
        "Windows PowerShell lo virtual environment activate chestaru.",
      ],
      [
        "source .venv/bin/activate",
        "Activate a virtual environment on Linux or macOS.",
        "Linux or macOS lo virtual environment activate chestaru.",
      ],
      [
        "python -m unittest",
        "Run tests using Python's built-in unittest framework.",
        "Built-in unittest framework tho tests run chestaru.",
      ],
      [
        "python -m pytest",
        "Run tests using pytest, if it is installed.",
        "Pytest install ayyi unte project tests run chestaru.",
      ],
      [
        "python -m compileall .",
        "Compile Python files in the current directory and its subdirectories.",
        "Current project lo Python files ni bytecode ga compile chestaru.",
      ],
      [
        "python -m py_compile app.py",
        "Compile a Python source file and check for syntax errors.",
        "Python file syntax errors check chestu compile chestaru.",
      ],
      [
        "python -m json.tool config.json",
        "Validate and pretty-print a JSON file.",
        "JSON file valid ga undo ledo check chesi readable format lo display chestaru.",
      ],
      [
        "python -m timeit \"sum(range(1000))\"",
        "Measure the execution time of a small Python statement.",
        "Small Python code execution time measure chestaru.",
      ],
    ]),

    ...makeCommands("Advanced", [
      [
        "python -m cProfile -s cumulative app.py",
        "Profile a Python script and sort results by cumulative execution time.",
        "Python application performance profile chesi cumulative time prakaram sort chestaru.",
      ],
      [
        "python -m cProfile -s time app.py",
        "Profile a Python script and sort results by internal execution time.",
        "Functions execution time prakaram performance results sort chestaru.",
      ],
      [
        "python -m trace --trace app.py",
        "Trace Python program execution line by line.",
        "Program execution ni line by line trace chestaru.",
      ],
      [
        "python -m dis app.py",
        "Disassemble Python bytecode for a source file.",
        "Python source file bytecode instructions inspect chestaru.",
      ],
      [
        "python -m ast app.py",
        "Display the abstract syntax tree of a Python source file.",
        "Python code abstract syntax tree ni inspect chestaru.",
      ],
      [
        "python -m zipapp myapp -o myapp.pyz",
        "Create an executable Python ZIP application.",
        "Python application ni executable ZIP archive ga package chestaru.",
      ],
      [
        "python -m ensurepip --upgrade",
        "Install or upgrade pip using Python's bundled ensurepip module.",
        "Python bundled ensurepip module use chesi pip install or upgrade chestaru.",
      ],
      [
        "python -I app.py",
        "Run a script in isolated mode.",
        "Environment variables and user site-packages influence lekunda isolated mode lo script run chestaru.",
      ],
      [
        "python -X importtime app.py",
        "Display module import timing information.",
        "Python modules import avvadaniki pattina time display chestaru.",
      ],
      [
        "python -X tracemalloc app.py",
        "Trace memory allocations while running a Python script.",
        "Python application memory allocations trace chestaru.",
      ],
      [
        "python -O app.py",
        "Run Python with optimization enabled.",
        "Python optimization mode lo script execute chestaru.",
      ],
      [
        "python -OO app.py",
        "Run Python with optimization enabled and docstrings removed.",
        "Optimization enable chesi docstrings remove chestu script run chestaru.",
      ],
    ]),

    ...makeCommands("Troubleshooting", [
      [
        "python -m pip debug --verbose",
        "Display detailed pip environment and compatibility information.",
        "Pip environment and compatibility details troubleshoot cheyadaniki use chestaru.",
      ],
      [
        "python -m pip cache info",
        "Display information about the pip package cache.",
        "Pip cache storage details check cheyadaniki use chestaru.",
      ],
      [
        "python -m pip cache purge",
        "Remove all cached packages from pip's cache.",
        "Pip cache lo unna files anni clear chestundi.",
      ],
      [
        "python -m pip config debug",
        "Display pip configuration files and related environment settings.",
        "Pip configuration files and settings problems identify cheyadaniki use chestaru.",
      ],
      [
        "python -m site",
        "Display Python site-package directories and site configuration.",
        "Python packages install ayye directories check cheyadaniki use chestaru.",
      ],
      [
        "python -m sysconfig",
        "Display Python installation and build configuration information.",
        "Python installation configuration details troubleshoot cheyadaniki use chestaru.",
      ],
      [
        "python -v app.py",
        "Display detailed module import messages while running a script.",
        "Module import problems identify cheyadaniki detailed logs display chestaru.",
      ],
      [
        "python -X dev app.py",
        "Run Python in development mode with additional runtime checks.",
        "Runtime warnings and development checks enable chesi application run chestaru.",
      ],
      [
        "python -W error app.py",
        "Treat Python warnings as exceptions.",
        "Warnings ni errors ga treat chesi problems identify chestaru.",
      ],
      [
        "python -E app.py",
        "Run Python while ignoring PYTHON environment variables.",
        "PYTHON environment variables valla vastunna issues troubleshoot chestaru.",
      ],
      [
        "python -B app.py",
        "Run a script without writing .pyc bytecode cache files.",
        "Python bytecode cache files create kakunda script run chestaru.",
      ],
      [
        "python -m pdb app.py",
        "Start the built-in Python debugger for a script.",
        "Python debugger use chesi errors and execution flow inspect chestaru.",
      ],
    ]),
  ],
};
