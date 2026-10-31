import type { DevOpsTool } from "./command-types";

export const gitTool: DevOpsTool = {
  name: "Git",
  category: "Version Control",
  commands: [
    // ==================== BASIC - 50 ====================

    {
      command: "git --version",
      level: "Basic",
      english: "Displays the installed Git version.",
      telugu: "Install అయిన Git version చూపిస్తుంది."
    },
    {
      command: "git help",
      level: "Basic",
      english: "Displays general Git help.",
      telugu: "Git గురించి general help చూపిస్తుంది."
    },
    {
      command: "git help commit",
      level: "Basic",
      english: "Displays help for the commit command.",
      telugu: "Commit command గురించి help చూపిస్తుంది."
    },
    {
      command: "git init",
      level: "Basic",
      english: "Initializes a new Git repository.",
      telugu: "కొత్త Git repository create చేస్తుంది."
    },
    {
      command: "git init my-project",
      level: "Basic",
      english: "Creates a new repository inside my-project.",
      telugu: "my-project folder లో కొత్త repository create చేస్తుంది."
    },
    {
      command: "git clone https://github.com/user/repo.git",
      level: "Basic",
      english: "Clones a remote repository.",
      telugu: "Remote repository ని local system కి clone చేస్తుంది."
    },
    {
      command: "git status",
      level: "Basic",
      english: "Shows the current repository status.",
      telugu: "Repository లో current changes status చూపిస్తుంది."
    },
    {
      command: "git status -s",
      level: "Basic",
      english: "Displays repository status in short format.",
      telugu: "Repository status ని short format లో చూపిస్తుంది."
    },
    {
      command: "git add file.txt",
      level: "Basic",
      english: "Stages a specific file.",
      telugu: "ఒక specific file ని staging area కి add చేస్తుంది."
    },
    {
      command: "git add .",
      level: "Basic",
      english: "Stages all changes in the current directory.",
      telugu: "Current directory లోని అన్ని changes ని stage చేస్తుంది."
    },
    {
      command: "git add -A",
      level: "Basic",
      english: "Stages all changes, including deletions.",
      telugu: "Files add, modify, delete చేసిన changes అన్నింటినీ stage చేస్తుంది."
    },
    {
      command: "git commit -m \"Initial commit\"",
      level: "Basic",
      english: "Creates a commit with a message.",
      telugu: "Message తో కొత్త commit create చేస్తుంది."
    },
    {
      command: "git log",
      level: "Basic",
      english: "Displays the commit history.",
      telugu: "Repository commit history చూపిస్తుంది."
    },
    {
      command: "git log --oneline",
      level: "Basic",
      english: "Displays commits in a compact format.",
      telugu: "Commit history ని one-line format లో చూపిస్తుంది."
    },
    {
      command: "git diff",
      level: "Basic",
      english: "Shows unstaged changes.",
      telugu: "Stage చేయని file changes చూపిస్తుంది."
    },
    {
      command: "git diff --staged",
      level: "Basic",
      english: "Shows staged changes.",
      telugu: "Staging area లో ఉన్న changes చూపిస్తుంది."
    },
    {
      command: "git branch",
      level: "Basic",
      english: "Lists local branches.",
      telugu: "Local branches అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git branch new-feature",
      level: "Basic",
      english: "Creates a new branch.",
      telugu: "కొత్త branch create చేస్తుంది."
    },
    {
      command: "git switch main",
      level: "Basic",
      english: "Switches to the main branch.",
      telugu: "Main branch కి switch అవుతుంది."
    },
    {
      command: "git switch -c feature-login",
      level: "Basic",
      english: "Creates and switches to a new branch.",
      telugu: "కొత్త branch create చేసి దానికి switch అవుతుంది."
    },
    {
      command: "git checkout main",
      level: "Basic",
      english: "Switches to the main branch using checkout.",
      telugu: "Checkout ఉపయోగించి main branch కి switch అవుతుంది."
    },
    {
      command: "git checkout -b feature-api",
      level: "Basic",
      english: "Creates and switches to a branch using checkout.",
      telugu: "Checkout తో కొత్త branch create చేసి switch అవుతుంది."
    },
    {
      command: "git merge feature-login",
      level: "Basic",
      english: "Merges feature-login into the current branch.",
      telugu: "Feature branch changes ని current branch లో merge చేస్తుంది."
    },
    {
      command: "git remote -v",
      level: "Basic",
      english: "Lists remote repository URLs.",
      telugu: "Remote repository URLs చూపిస్తుంది."
    },
    {
      command: "git remote add origin https://github.com/user/repo.git",
      level: "Basic",
      english: "Adds a remote named origin.",
      telugu: "Origin పేరుతో remote repository add చేస్తుంది."
    },
    {
      command: "git fetch",
      level: "Basic",
      english: "Downloads updates from the remote repository.",
      telugu: "Remote repository నుంచి updates download చేస్తుంది."
    },
    {
      command: "git pull",
      level: "Basic",
      english: "Fetches and integrates remote changes.",
      telugu: "Remote changes తీసుకుని current branch లో integrate చేస్తుంది."
    },
    {
      command: "git push",
      level: "Basic",
      english: "Pushes local commits to the remote branch.",
      telugu: "Local commits ని remote branch కి పంపిస్తుంది."
    },
    {
      command: "git push -u origin main",
      level: "Basic",
      english: "Pushes main and sets its upstream branch.",
      telugu: "Main branch ని push చేసి upstream tracking set చేస్తుంది."
    },
    {
      command: "git show",
      level: "Basic",
      english: "Displays details of the latest commit.",
      telugu: "Latest commit details చూపిస్తుంది."
    },
    {
      command: "git show HEAD",
      level: "Basic",
      english: "Displays the current HEAD commit.",
      telugu: "Current HEAD commit details చూపిస్తుంది."
    },
    {
      command: "git rm file.txt",
      level: "Basic",
      english: "Removes a tracked file and stages the deletion.",
      telugu: "Tracked file ని remove చేసి deletion ని stage చేస్తుంది."
    },
    {
      command: "git mv old.txt new.txt",
      level: "Basic",
      english: "Renames or moves a tracked file.",
      telugu: "Tracked file ని rename లేదా move చేస్తుంది."
    },
    {
      command: "git restore file.txt",
      level: "Basic",
      english: "Discards unstaged changes in a file.",
      telugu: "File లో stage చేయని changes ని discard చేస్తుంది."
    },
    {
      command: "git restore --staged file.txt",
      level: "Basic",
      english: "Unstages a file without deleting its changes.",
      telugu: "File changes delete చేయకుండా staging నుంచి remove చేస్తుంది."
    },
    {
      command: "git reset",
      level: "Basic",
      english: "Unstages staged changes using the default mixed mode.",
      telugu: "Default mixed mode తో staged changes ని unstage చేస్తుంది."
    },
    {
      command: "git reset --soft HEAD~1",
      level: "Basic",
      english: "Moves HEAD back one commit and keeps changes staged.",
      telugu: "ఒక commit వెనక్కి వెళ్లి changes ని staged లో ఉంచుతుంది."
    },
    {
      command: "git reset --mixed HEAD~1",
      level: "Basic",
      english: "Moves HEAD back one commit and unstages changes.",
      telugu: "ఒక commit వెనక్కి వెళ్లి changes ని unstage చేస్తుంది."
    },
    {
      command: "git config --global user.name \"Your Name\"",
      level: "Basic",
      english: "Sets the global Git username.",
      telugu: "Global Git username set చేస్తుంది."
    },
    {
      command: "git config --global user.email \"you@example.com\"",
      level: "Basic",
      english: "Sets the global Git email address.",
      telugu: "Global Git email address set చేస్తుంది."
    },
    {
      command: "git config --list",
      level: "Basic",
      english: "Lists Git configuration settings.",
      telugu: "Git configuration settings అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git config user.name",
      level: "Basic",
      english: "Displays the configured username.",
      telugu: "Configure చేసిన username చూపిస్తుంది."
    },
    {
      command: "git config user.email",
      level: "Basic",
      english: "Displays the configured email address.",
      telugu: "Configure చేసిన email address చూపిస్తుంది."
    },
    {
      command: "git tag",
      level: "Basic",
      english: "Lists existing tags.",
      telugu: "Repository లో ఉన్న tags చూపిస్తుంది."
    },
    {
      command: "git tag v1.0.0",
      level: "Basic",
      english: "Creates a lightweight tag.",
      telugu: "Lightweight tag create చేస్తుంది."
    },
    {
      command: "git show v1.0.0",
      level: "Basic",
      english: "Displays information about a tag.",
      telugu: "ఆ tag కి సంబంధించిన details చూపిస్తుంది."
    },
    {
      command: "git stash",
      level: "Basic",
      english: "Temporarily saves tracked working-tree changes.",
      telugu: "Tracked working-tree changes ని temporary గా save చేస్తుంది."
    },
    {
      command: "git stash pop",
      level: "Basic",
      english: "Applies the latest stash and removes it from the stash list.",
      telugu: "Latest stash changes apply చేసి stash list నుంచి remove చేస్తుంది."
    },
    {
      command: "git stash list",
      level: "Basic",
      english: "Lists saved stashes.",
      telugu: "Save చేసిన stashes అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git clean -n",
      level: "Basic",
      english: "Previews untracked files that would be removed.",
      telugu: "Remove అయ్యే untracked files ని preview చూపిస్తుంది."
    },

    // ==================== INTERMEDIATE - 60 ====================

    {
      command: "git log --graph --oneline",
      level: "Intermediate",
      english: "Displays commit history as a compact graph.",
      telugu: "Commit history ని graph రూపంలో చూపిస్తుంది."
    },
    {
      command: "git log --all --decorate --oneline",
      level: "Intermediate",
      english: "Displays all branches and their commit references.",
      telugu: "అన్ని branches మరియు వాటి commit references చూపిస్తుంది."
    },
    {
      command: "git log -5",
      level: "Intermediate",
      english: "Displays the five most recent commits.",
      telugu: "Latest ఐదు commits చూపిస్తుంది."
    },
    {
      command: "git log --author=\"Your Name\"",
      level: "Intermediate",
      english: "Filters commits by author.",
      telugu: "Author ఆధారంగా commits filter చేస్తుంది."
    },
    {
      command: "git log --since=\"2 weeks ago\"",
      level: "Intermediate",
      english: "Shows commits created within the specified period.",
      telugu: "Specified time period లో చేసిన commits చూపిస్తుంది."
    },
    {
      command: "git log --until=\"2026-10-01\"",
      level: "Intermediate",
      english: "Shows commits created before the specified date.",
      telugu: "Specified date కి ముందు చేసిన commits చూపిస్తుంది."
    },
    {
      command: "git log -- file.txt",
      level: "Intermediate",
      english: "Shows commit history for a specific file.",
      telugu: "ఒక specific file కి సంబంధించిన commit history చూపిస్తుంది."
    },
    {
      command: "git log --stat",
      level: "Intermediate",
      english: "Shows file change statistics for commits.",
      telugu: "Commits లో file changes statistics చూపిస్తుంది."
    },
    {
      command: "git log -p",
      level: "Intermediate",
      english: "Displays patches introduced by commits.",
      telugu: "ప్రతి commit చేసిన code changes చూపిస్తుంది."
    },
    {
      command: "git diff main..feature-login",
      level: "Intermediate",
      english: "Compares changes between two branches.",
      telugu: "రెండు branches మధ్య changes compare చేస్తుంది."
    },
    {
      command: "git diff HEAD~1 HEAD",
      level: "Intermediate",
      english: "Compares the latest commit with its parent.",
      telugu: "Latest commit ని దాని previous commit తో compare చేస్తుంది."
    },
    {
      command: "git diff --name-only",
      level: "Intermediate",
      english: "Lists files changed in the working tree.",
      telugu: "Working tree లో మారిన file names చూపిస్తుంది."
    },
    {
      command: "git diff --stat",
      level: "Intermediate",
      english: "Shows a summary of changed files.",
      telugu: "Changed files summary చూపిస్తుంది."
    },
    {
      command: "git branch -a",
      level: "Intermediate",
      english: "Lists local and remote-tracking branches.",
      telugu: "Local మరియు remote-tracking branches చూపిస్తుంది."
    },
    {
      command: "git branch -r",
      level: "Intermediate",
      english: "Lists remote-tracking branches.",
      telugu: "Remote-tracking branches మాత్రమే చూపిస్తుంది."
    },
    {
      command: "git branch -d feature-login",
      level: "Intermediate",
      english: "Deletes a fully merged local branch.",
      telugu: "Merge అయిన local branch ని delete చేస్తుంది."
    },
    {
      command: "git branch -D feature-login",
      level: "Intermediate",
      english: "Force-deletes a local branch.",
      telugu: "Local branch ని force గా delete చేస్తుంది."
    },
    {
      command: "git branch -m old-name new-name",
      level: "Intermediate",
      english: "Renames a local branch.",
      telugu: "Local branch పేరు మార్చుతుంది."
    },
    {
      command: "git branch --show-current",
      level: "Intermediate",
      english: "Displays the current branch name.",
      telugu: "ప్రస్తుతం ఉన్న branch పేరు చూపిస్తుంది."
    },
    {
      command: "git switch -",
      level: "Intermediate",
      english: "Switches to the previously checked-out branch.",
      telugu: "ఇంతకుముందు checkout చేసిన branch కి తిరిగి వెళ్తుంది."
    },
    {
      command: "git switch --detach HEAD~1",
      level: "Intermediate",
      english: "Checks out a commit in detached HEAD mode.",
      telugu: "Detached HEAD mode లో ఒక previous commit కి వెళ్తుంది."
    },
    {
      command: "git checkout -- file.txt",
      level: "Intermediate",
      english: "Restores a file from the index or current commit.",
      telugu: "Index లేదా current commit నుంచి file ని restore చేస్తుంది."
    },
    {
      command: "git merge --no-ff feature-api",
      level: "Intermediate",
      english: "Creates a merge commit even when fast-forward is possible.",
      telugu: "Fast-forward సాధ్యమైనా ప్రత్యేక merge commit create చేస్తుంది."
    },
    {
      command: "git merge --ff-only feature-api",
      level: "Intermediate",
      english: "Merges only when a fast-forward is possible.",
      telugu: "Fast-forward సాధ్యమైనప్పుడు మాత్రమే merge చేస్తుంది."
    },
    {
      command: "git merge --abort",
      level: "Intermediate",
      english: "Aborts an ongoing merge.",
      telugu: "ప్రస్తుతం జరుగుతున్న merge ని cancel చేస్తుంది."
    },
    {
      command: "git rebase main",
      level: "Intermediate",
      english: "Reapplies current branch commits on top of main.",
      telugu: "Current branch commits ని main పైన మళ్లీ apply చేస్తుంది."
    },
    {
      command: "git rebase --continue",
      level: "Intermediate",
      english: "Continues a rebase after resolving conflicts.",
      telugu: "Conflicts resolve చేసిన తర్వాత rebase continue చేస్తుంది."
    },
    {
      command: "git rebase --abort",
      level: "Intermediate",
      english: "Cancels an ongoing rebase.",
      telugu: "జరుగుతున్న rebase ని cancel చేస్తుంది."
    },
    {
      command: "git rebase --skip",
      level: "Intermediate",
      english: "Skips the current commit during a rebase.",
      telugu: "Rebase సమయంలో current commit ని skip చేస్తుంది."
    },
    {
      command: "git cherry-pick abc1234",
      level: "Intermediate",
      english: "Applies a specific commit to the current branch.",
      telugu: "ఒక specific commit ని current branch కి apply చేస్తుంది."
    },
    {
      command: "git cherry-pick --continue",
      level: "Intermediate",
      english: "Continues a cherry-pick after conflict resolution.",
      telugu: "Conflict resolve చేసిన తర్వాత cherry-pick continue చేస్తుంది."
    },
    {
      command: "git cherry-pick --abort",
      level: "Intermediate",
      english: "Aborts an ongoing cherry-pick operation.",
      telugu: "జరుగుతున్న cherry-pick operation ని cancel చేస్తుంది."
    },
    {
      command: "git cherry-pick --skip",
      level: "Intermediate",
      english: "Skips the current commit in a cherry-pick sequence.",
      telugu: "Cherry-pick sequence లో current commit ని skip చేస్తుంది."
    },
    {
      command: "git stash push -m \"work in progress\"",
      level: "Intermediate",
      english: "Saves changes with a descriptive stash message.",
      telugu: "Description message తో changes ని stash చేస్తుంది."
    },
    {
      command: "git stash apply",
      level: "Intermediate",
      english: "Applies the latest stash without deleting it.",
      telugu: "Latest stash ని delete చేయకుండా apply చేస్తుంది."
    },
    {
      command: "git stash show -p",
      level: "Intermediate",
      english: "Displays the patch stored in the latest stash.",
      telugu: "Latest stash లోని complete changes చూపిస్తుంది."
    },
    {
      command: "git stash drop stash@{0}",
      level: "Intermediate",
      english: "Deletes a specific stash entry.",
      telugu: "Specific stash entry ని delete చేస్తుంది."
    },
    {
      command: "git stash clear",
      level: "Intermediate",
      english: "Removes all stash entries.",
      telugu: "Stash list లోని entries అన్నింటినీ remove చేస్తుంది."
    },
    {
      command: "git stash push -u",
      level: "Intermediate",
      english: "Stashes tracked and untracked files.",
      telugu: "Tracked మరియు untracked files ని stash చేస్తుంది."
    },
    {
      command: "git stash push -a",
      level: "Intermediate",
      english: "Stashes tracked, untracked, and ignored files.",
      telugu: "Tracked, untracked మరియు ignored files ని stash చేస్తుంది."
    },
    {
      command: "git remote show origin",
      level: "Intermediate",
      english: "Displays detailed information about the origin remote.",
      telugu: "Origin remote గురించి detailed information చూపిస్తుంది."
    },
    {
      command: "git remote rename origin upstream",
      level: "Intermediate",
      english: "Renames a configured remote.",
      telugu: "Configured remote పేరు మార్చుతుంది."
    },
    {
      command: "git remote remove upstream",
      level: "Intermediate",
      english: "Removes a configured remote.",
      telugu: "Configured remote ని remove చేస్తుంది."
    },
    {
      command: "git remote set-url origin https://github.com/user/new-repo.git",
      level: "Intermediate",
      english: "Changes the URL of an existing remote.",
      telugu: "Existing remote repository URL ని మార్చుతుంది."
    },
    {
      command: "git fetch origin main",
      level: "Intermediate",
      english: "Fetches the main branch from origin.",
      telugu: "Origin నుంచి main branch updates fetch చేస్తుంది."
    },
    {
      command: "git fetch --all",
      level: "Intermediate",
      english: "Fetches updates from all configured remotes.",
      telugu: "Configure చేసిన అన్ని remotes నుంచి updates fetch చేస్తుంది."
    },
    {
      command: "git pull --rebase",
      level: "Intermediate",
      english: "Rebases local commits on top of fetched changes.",
      telugu: "Fetched changes పైన local commits ని rebase చేస్తుంది."
    },
    {
      command: "git push origin feature-login",
      level: "Intermediate",
      english: "Pushes a specific local branch to origin.",
      telugu: "Specific local branch ని origin కి push చేస్తుంది."
    },
    {
      command: "git push origin --delete feature-login",
      level: "Intermediate",
      english: "Deletes a remote branch.",
      telugu: "Remote repository లో branch ని delete చేస్తుంది."
    },
    {
      command: "git push --tags",
      level: "Intermediate",
      english: "Pushes local tags to the remote repository.",
      telugu: "Local tags అన్నింటినీ remote repository కి push చేస్తుంది."
    },
    {
      command: "git tag -a v2.0 -m \"Version 2.0\"",
      level: "Intermediate",
      english: "Creates an annotated tag with a message.",
      telugu: "Message తో annotated tag create చేస్తుంది."
    },
    {
      command: "git tag -d v1.0.0",
      level: "Intermediate",
      english: "Deletes a local tag.",
      telugu: "Local tag ని delete చేస్తుంది."
    },
    {
      command: "git push origin --delete v1.0.0",
      level: "Intermediate",
      english: "Deletes a tag from the remote repository.",
      telugu: "Remote repository నుంచి tag ని delete చేస్తుంది."
    },
    {
      command: "git show-ref",
      level: "Intermediate",
      english: "Lists references available in the repository.",
      telugu: "Repository లోని references అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git ls-files",
      level: "Intermediate",
      english: "Lists files tracked by Git.",
      telugu: "Git track చేస్తున్న files చూపిస్తుంది."
    },
    {
      command: "git ls-files --others",
      level: "Intermediate",
      english: "Lists untracked files.",
      telugu: "Git track చేయని files చూపిస్తుంది."
    },
    {
      command: "git blame file.txt",
      level: "Intermediate",
      english: "Shows who last modified each line of a file.",
      telugu: "File లో ప్రతి line ని చివరిగా ఎవరు మార్చారో చూపిస్తుంది."
    },
    {
      command: "git grep \"TODO\"",
      level: "Intermediate",
      english: "Searches tracked files for a text pattern.",
      telugu: "Tracked files లో TODO text ని search చేస్తుంది."
    },
    {
      command: "git shortlog -sn",
      level: "Intermediate",
      english: "Summarizes commits grouped by author.",
      telugu: "Author ఆధారంగా commit count summary చూపిస్తుంది."
    },
    {
      command: "git describe --tags",
      level: "Intermediate",
      english: "Describes the current commit using the nearest tag.",
      telugu: "Nearest tag ఆధారంగా current commit ని describe చేస్తుంది."
    },
    {
      command: "git archive --format=zip HEAD -o source.zip",
      level: "Intermediate",
      english: "Creates a ZIP archive from the current commit.",
      telugu: "Current commit నుంచి ZIP archive create చేస్తుంది."
    },

    // ==================== ADVANCED - 50 ====================

    {
      command: "git rebase -i HEAD~3",
      level: "Advanced",
      english: "Interactively edits the last three commits.",
      telugu: "Last three commits ని interactive గా edit చేస్తుంది."
    },
    {
      command: "git commit --amend",
      level: "Advanced",
      english: "Modifies the most recent commit.",
      telugu: "Latest commit ని modify చేస్తుంది."
    },
    {
      command: "git commit --amend --no-edit",
      level: "Advanced",
      english: "Adds staged changes to the previous commit without changing its message.",
      telugu: "Commit message మార్చకుండా staged changes ని previous commit లో add చేస్తుంది."
    },
    {
      command: "git commit --fixup abc1234",
      level: "Advanced",
      english: "Creates a fixup commit targeting another commit.",
      telugu: "ఇంకొక commit ని fix చేయడానికి fixup commit create చేస్తుంది."
    },
    {
      command: "git commit --squash abc1234",
      level: "Advanced",
      english: "Creates a squash commit targeting another commit.",
      telugu: "Target commit తో squash చేయడానికి commit create చేస్తుంది."
    },
    {
      command: "git rebase -i --autosquash main",
      level: "Advanced",
      english: "Automatically arranges fixup and squash commits during interactive rebase.",
      telugu: "Interactive rebase లో fixup మరియు squash commits ని automatically arrange చేస్తుంది."
    },
    {
      command: "git reset --hard HEAD~1",
      level: "Advanced",
      english: "Moves HEAD back one commit and discards working-tree changes.",
      telugu: "ఒక commit వెనక్కి వెళ్లి working-tree changes discard చేస్తుంది."
    },
    {
      command: "git reset --hard origin/main",
      level: "Advanced",
      english: "Resets the current branch to match origin/main.",
      telugu: "Current branch ని origin/main state కి reset చేస్తుంది. Local changes పోతాయి."
    },
    {
      command: "git revert HEAD",
      level: "Advanced",
      english: "Creates a new commit that reverses the latest commit.",
      telugu: "Latest commit changes ని reverse చేసే కొత్త commit create చేస్తుంది."
    },
    {
      command: "git revert abc1234",
      level: "Advanced",
      english: "Reverts the changes introduced by a specific commit.",
      telugu: "Specific commit చేసిన changes ని reverse చేస్తుంది."
    },
    {
      command: "git revert -m 1 merge-commit",
      level: "Advanced",
      english: "Reverts a merge commit using its first parent as the mainline.",
      telugu: "First parent ని mainline గా తీసుకుని merge commit ని revert చేస్తుంది."
    },
    {
      command: "git cherry-pick A..B",
      level: "Advanced",
      english: "Cherry-picks commits after A through B.",
      telugu: "A తర్వాత B వరకు ఉన్న commits ని cherry-pick చేస్తుంది."
    },
    {
      command: "git cherry-pick --no-commit abc1234",
      level: "Advanced",
      english: "Applies a commit without creating a new commit immediately.",
      telugu: "కొత్త commit create చేయకుండా changes ని apply చేస్తుంది."
    },
    {
      command: "git merge --squash feature-api",
      level: "Advanced",
      english: "Combines branch changes into the index without creating a merge commit.",
      telugu: "Merge commit create చేయకుండా feature changes ని ఒక staged change గా combine చేస్తుంది."
    },
    {
      command: "git merge-base main feature-api",
      level: "Advanced",
      english: "Finds the best common ancestor of two branches.",
      telugu: "రెండు branches కి common ancestor commit ని కనుగొంటుంది."
    },
    {
      command: "git merge-tree $(git merge-base main feature-api) main feature-api",
      level: "Advanced",
      english: "Shows a potential merge result without updating the working tree.",
      telugu: "Working tree మార్చకుండా potential merge result చూపిస్తుంది."
    },
    {
      command: "git worktree add ../hotfix hotfix-branch",
      level: "Advanced",
      english: "Creates another working tree for an existing branch.",
      telugu: "Existing branch కోసం separate working tree create చేస్తుంది."
    },
    {
      command: "git worktree list",
      level: "Advanced",
      english: "Lists all linked working trees.",
      telugu: "Linked working trees అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git worktree remove ../hotfix",
      level: "Advanced",
      english: "Removes a linked working tree.",
      telugu: "Linked working tree ని remove చేస్తుంది."
    },
    {
      command: "git worktree prune",
      level: "Advanced",
      english: "Removes stale working-tree administrative records.",
      telugu: "వాడుకలో లేని working-tree records ని clean చేస్తుంది."
    },
    {
      command: "git submodule add https://github.com/user/library.git libs/library",
      level: "Advanced",
      english: "Adds another Git repository as a submodule.",
      telugu: "మరొక Git repository ని submodule గా add చేస్తుంది."
    },
    {
      command: "git submodule init",
      level: "Advanced",
      english: "Initializes submodule configuration.",
      telugu: "Submodule configuration ని initialize చేస్తుంది."
    },
    {
      command: "git submodule update --init --recursive",
      level: "Advanced",
      english: "Initializes and updates nested submodules.",
      telugu: "Nested submodules అన్నింటినీ initialize చేసి update చేస్తుంది."
    },
    {
      command: "git submodule status",
      level: "Advanced",
      english: "Displays the status of submodules.",
      telugu: "Submodules status చూపిస్తుంది."
    },
    {
      command: "git filter-branch --tree-filter 'rm -f secrets.txt' -- --all",
      level: "Advanced",
      english: "Rewrites repository history by removing a file from commits.",
      telugu: "Commits నుంచి file remove చేయడానికి repository history rewrite చేస్తుంది."
    },
    {
      command: "git filter-repo --path secrets.txt --invert-paths",
      level: "Advanced",
      english: "Removes a path from repository history using git-filter-repo.",
      telugu: "Git-filter-repo ఉపయోగించి repository history నుంచి file path remove చేస్తుంది."
    },
    {
      command: "git reflog",
      level: "Advanced",
      english: "Displays the history of local reference movements.",
      telugu: "Local HEAD మరియు references మారిన history చూపిస్తుంది."
    },
    {
      command: "git reflog show main",
      level: "Advanced",
      english: "Displays the reflog for the main branch.",
      telugu: "Main branch కి సంబంధించిన reflog చూపిస్తుంది."
    },
    {
      command: "git fsck --full",
      level: "Advanced",
      english: "Checks repository object connectivity and validity.",
      telugu: "Repository objects connectivity మరియు validity check చేస్తుంది."
    },
    {
      command: "git gc",
      level: "Advanced",
      english: "Runs garbage collection to optimize the repository.",
      telugu: "Repository ని optimize చేయడానికి garbage collection run చేస్తుంది."
    },
    {
      command: "git gc --aggressive",
      level: "Advanced",
      english: "Runs more aggressive repository optimization.",
      telugu: "Repository పై aggressive optimization run చేస్తుంది."
    },
    {
      command: "git count-objects -v",
      level: "Advanced",
      english: "Reports repository object storage statistics.",
      telugu: "Repository object storage statistics చూపిస్తుంది."
    },
    {
      command: "git repack -ad",
      level: "Advanced",
      english: "Repackages repository objects into pack files.",
      telugu: "Repository objects ని pack files లోకి repack చేస్తుంది."
    },
    {
      command: "git bundle create repo.bundle --all",
      level: "Advanced",
      english: "Creates a bundle containing all repository references.",
      telugu: "Repository references అన్నింటితో bundle create చేస్తుంది."
    },
    {
      command: "git bundle verify repo.bundle",
      level: "Advanced",
      english: "Verifies the integrity of a Git bundle.",
      telugu: "Git bundle integrity ని verify చేస్తుంది."
    },
    {
      command: "git bundle list-heads repo.bundle",
      level: "Advanced",
      english: "Lists references stored in a Git bundle.",
      telugu: "Git bundle లో ఉన్న references చూపిస్తుంది."
    },
    {
      command: "git notes add -m \"Reviewed\"",
      level: "Advanced",
      english: "Adds a note to the current commit.",
      telugu: "Current commit కి note add చేస్తుంది."
    },
    {
      command: "git notes show",
      level: "Advanced",
      english: "Displays notes attached to the current commit.",
      telugu: "Current commit కి attach చేసిన notes చూపిస్తుంది."
    },
    {
      command: "git notes list",
      level: "Advanced",
      english: "Lists available Git notes.",
      telugu: "Repository లోని Git notes చూపిస్తుంది."
    },
    {
      command: "git replace abc1234 def5678",
      level: "Advanced",
      english: "Creates a replacement reference for a Git object.",
      telugu: "ఒక Git object కి replacement reference create చేస్తుంది."
    },
    {
      command: "git replace -l",
      level: "Advanced",
      english: "Lists replacement references.",
      telugu: "Replacement references అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git bisect start",
      level: "Advanced",
      english: "Starts a binary search through commit history.",
      telugu: "Commit history లో bug ఎక్కడ వచ్చిందో కనుగొనడానికి bisect ప్రారంభిస్తుంది."
    },
    {
      command: "git bisect bad",
      level: "Advanced",
      english: "Marks the current commit as containing the bug.",
      telugu: "Current commit లో bug ఉందని mark చేస్తుంది."
    },
    {
      command: "git bisect good abc1234",
      level: "Advanced",
      english: "Marks a known good commit for the bisect search.",
      telugu: "Bug లేని known commit ని good గా mark చేస్తుంది."
    },
    {
      command: "git bisect run npm test",
      level: "Advanced",
      english: "Runs an automated test command during bisect.",
      telugu: "Bisect process లో automated test command run చేస్తుంది."
    },
    {
      command: "git bisect reset",
      level: "Advanced",
      english: "Ends bisect and returns to the original branch.",
      telugu: "Bisect process ముగించి original branch కి తిరిగి వెళ్తుంది."
    },
    {
      command: "git rev-list --all --count",
      level: "Advanced",
      english: "Counts commits reachable from all references.",
      telugu: "అన్ని references నుంచి reachable అయిన commits count చూపిస్తుంది."
    },
    {
      command: "git rev-parse HEAD",
      level: "Advanced",
      english: "Displays the full object ID of HEAD.",
      telugu: "HEAD యొక్క full commit hash చూపిస్తుంది."
    },
    {
      command: "git cat-file -p HEAD",
      level: "Advanced",
      english: "Displays the contents of a Git object.",
      telugu: "Git object లోని contents చూపిస్తుంది."
    },
    {
      command: "git update-ref refs/heads/backup HEAD",
      level: "Advanced",
      english: "Creates or updates a reference to the current commit.",
      telugu: "Current commit కి backup reference create లేదా update చేస్తుంది."
    },

    // ==================== TROUBLESHOOTING - 60 ====================

    {
      command: "git status --porcelain",
      level: "Troubleshooting",
      english: "Shows machine-readable repository status for scripts.",
      telugu: "Scripts ద్వారా status check చేయడానికి machine-readable output ఇస్తుంది."
    },
    {
      command: "git diff --check",
      level: "Troubleshooting",
      english: "Checks for whitespace errors in changes.",
      telugu: "Changes లో whitespace errors ఉన్నాయో check చేస్తుంది."
    },
    {
      command: "git diff --check HEAD",
      level: "Troubleshooting",
      english: "Checks all changes against HEAD for whitespace problems.",
      telugu: "HEAD తో పోల్చి whitespace problems check చేస్తుంది."
    },
    {
      command: "git fsck",
      level: "Troubleshooting",
      english: "Checks the repository for missing or corrupt objects.",
      telugu: "Repository లో missing లేదా corrupt objects ఉన్నాయో check చేస్తుంది."
    },
    {
      command: "git fsck --no-reflogs --unreachable",
      level: "Troubleshooting",
      english: "Finds unreachable objects not referenced by reflogs.",
      telugu: "Reflog references లేని unreachable objects కనుగొంటుంది."
    },
    {
      command: "git status --ignored",
      level: "Troubleshooting",
      english: "Shows ignored files along with repository status.",
      telugu: "Ignored files తో పాటు repository status చూపిస్తుంది."
    },
    {
      command: "git check-ignore -v file.log",
      level: "Troubleshooting",
      english: "Identifies which ignore rule excludes a file.",
      telugu: "ఒక file ఎందుకు ignore అవుతుందో rule తో సహా చూపిస్తుంది."
    },
    {
      command: "git check-attr -a -- file.txt",
      level: "Troubleshooting",
      english: "Displays Git attributes applied to a file.",
      telugu: "ఒక file కి apply అయిన Git attributes చూపిస్తుంది."
    },
    {
      command: "git config --show-origin --list",
      level: "Troubleshooting",
      english: "Shows configuration values and their source files.",
      telugu: "Git configuration values ఏ file నుంచి వచ్చాయో చూపిస్తుంది."
    },
    {
      command: "git config --get-regexp credential",
      level: "Troubleshooting",
      english: "Lists credential-related Git configuration entries.",
      telugu: "Credential కి సంబంధించిన Git configuration entries చూపిస్తుంది."
    },
    {
      command: "git remote get-url origin",
      level: "Troubleshooting",
      english: "Displays the fetch URL configured for origin.",
      telugu: "Origin కి configure చేసిన fetch URL చూపిస్తుంది."
    },
    {
      command: "git ls-remote origin",
      level: "Troubleshooting",
      english: "Checks remote references and their object IDs.",
      telugu: "Remote repository references మరియు hashes check చేస్తుంది."
    },
    {
      command: "git ls-remote --heads origin",
      level: "Troubleshooting",
      english: "Lists branch references available on the remote.",
      telugu: "Remote లో available ఉన్న branches చూపిస్తుంది."
    },
    {
      command: "git ls-remote --tags origin",
      level: "Troubleshooting",
      english: "Lists tags available on the remote.",
      telugu: "Remote repository లో available tags చూపిస్తుంది."
    },
    {
      command: "git fetch --prune origin",
      level: "Troubleshooting",
      english: "Fetches updates and removes stale remote-tracking references.",
      telugu: "Updates fetch చేసి stale remote-tracking references remove చేస్తుంది."
    },
    {
      command: "git remote prune origin",
      level: "Troubleshooting",
      english: "Removes stale remote-tracking branches for origin.",
      telugu: "Origin లో లేని stale remote-tracking branches ని remove చేస్తుంది."
    },
    {
      command: "git branch -vv",
      level: "Troubleshooting",
      english: "Shows local branches and their upstream tracking status.",
      telugu: "Local branches మరియు upstream tracking status చూపిస్తుంది."
    },
    {
      command: "git rev-parse --is-inside-work-tree",
      level: "Troubleshooting",
      english: "Checks whether the current directory is inside a Git working tree.",
      telugu: "Current directory Git working tree లో ఉందో లేదో check చేస్తుంది."
    },
    {
      command: "git rev-parse --show-toplevel",
      level: "Troubleshooting",
      english: "Displays the repository root directory.",
      telugu: "Repository root directory path చూపిస్తుంది."
    },
    {
      command: "git rev-parse --git-dir",
      level: "Troubleshooting",
      english: "Displays the Git metadata directory path.",
      telugu: "Git metadata directory path చూపిస్తుంది."
    },
    {
      command: "git rev-parse --show-prefix",
      level: "Troubleshooting",
      english: "Displays the path from repository root to the current directory.",
      telugu: "Repository root నుంచి current directory వరకు path చూపిస్తుంది."
    },
    {
      command: "git diff --merge",
      level: "Troubleshooting",
      english: "Shows changes involved in a conflicted merge.",
      telugu: "Conflict వచ్చిన merge లోని changes చూపిస్తుంది."
    },
    {
      command: "git diff --base",
      level: "Troubleshooting",
      english: "Shows differences between the working tree and the merge base.",
      telugu: "Working tree మరియు merge base మధ్య differences చూపిస్తుంది."
    },
    {
      command: "git diff --ours",
      level: "Troubleshooting",
      english: "Shows differences against the current branch version during a merge.",
      telugu: "Merge సమయంలో current branch version తో differences చూపిస్తుంది."
    },
    {
      command: "git diff --theirs",
      level: "Troubleshooting",
      english: "Shows differences against the incoming branch version during a merge.",
      telugu: "Merge సమయంలో incoming branch version తో differences చూపిస్తుంది."
    },
    {
      command: "git checkout --ours -- file.txt",
      level: "Troubleshooting",
      english: "Keeps the current branch version of a conflicted file.",
      telugu: "Conflict వచ్చిన file లో current branch version ని ఉంచుతుంది."
    },
    {
      command: "git checkout --theirs -- file.txt",
      level: "Troubleshooting",
      english: "Keeps the incoming branch version of a conflicted file.",
      telugu: "Conflict వచ్చిన file లో incoming branch version ని ఉంచుతుంది."
    },
    {
      command: "git restore --ours -- file.txt",
      level: "Troubleshooting",
      english: "Restores the current-side version of an unmerged file.",
      telugu: "Unmerged file లో current-side version ని restore చేస్తుంది."
    },
    {
      command: "git restore --theirs -- file.txt",
      level: "Troubleshooting",
      english: "Restores the incoming-side version of an unmerged file.",
      telugu: "Unmerged file లో incoming-side version ని restore చేస్తుంది."
    },
    {
      command: "git ls-files -u",
      level: "Troubleshooting",
      english: "Lists files that have unresolved merge conflicts.",
      telugu: "Resolve కాని merge conflict files చూపిస్తుంది."
    },
    {
      command: "git log --merge",
      level: "Troubleshooting",
      english: "Displays commits related to the current merge conflict.",
      telugu: "Current merge conflict కి సంబంధించిన commits చూపిస్తుంది."
    },
    {
      command: "git log --left-right main...feature-api",
      level: "Troubleshooting",
      english: "Shows commits unique to each side of a branch comparison.",
      telugu: "రెండు branches లో వేర్వేరుగా ఉన్న commits చూపిస్తుంది."
    },
    {
      command: "git log --cherry-pick --left-right main...feature-api",
      level: "Troubleshooting",
      english: "Compares branch commits while excluding equivalent patches.",
      telugu: "Equivalent patches ని పక్కన పెట్టి branch commits compare చేస్తుంది."
    },
    {
      command: "git merge-base --is-ancestor main feature-api",
      level: "Troubleshooting",
      english: "Checks whether main is an ancestor of feature-api.",
      telugu: "Main branch, feature-api కి ancestor అవుతుందో లేదో check చేస్తుంది."
    },
    {
      command: "git status -sb",
      level: "Troubleshooting",
      english: "Shows branch and working-tree status in compact form.",
      telugu: "Branch మరియు working-tree status ని compact గా చూపిస్తుంది."
    },
    {
      command: "git diff --cached --check",
      level: "Troubleshooting",
      english: "Checks staged changes for whitespace errors.",
      telugu: "Staged changes లో whitespace errors ఉన్నాయో check చేస్తుంది."
    },
    {
      command: "git diff --numstat",
      level: "Troubleshooting",
      english: "Shows added and deleted line counts for changed files.",
      telugu: "Changed files లో added మరియు deleted lines count చూపిస్తుంది."
    },
    {
      command: "git diff --summary",
      level: "Troubleshooting",
      english: "Displays a summary of file creations, deletions, and mode changes.",
      telugu: "File create, delete మరియు mode changes summary చూపిస్తుంది."
    },
    {
      command: "git diff --binary",
      level: "Troubleshooting",
      english: "Generates a diff that includes binary file changes.",
      telugu: "Binary file changes కూడా include అయ్యే diff generate చేస్తుంది."
    },
    {
      command: "git diff --no-index file1.txt file2.txt",
      level: "Troubleshooting",
      english: "Compares two files outside normal Git tracking.",
      telugu: "Git tracking కి సంబంధం లేకుండా రెండు files compare చేస్తుంది."
    },
    {
      command: "git show --format=fuller HEAD",
      level: "Troubleshooting",
      english: "Displays detailed author and committer information for HEAD.",
      telugu: "HEAD commit కి సంబంధించిన detailed author మరియు committer details చూపిస్తుంది."
    },
    {
      command: "git log --format=fuller -1",
      level: "Troubleshooting",
      english: "Displays detailed metadata for the latest commit.",
      telugu: "Latest commit metadata ని detailed గా చూపిస్తుంది."
    },
    {
      command: "git cat-file -t HEAD",
      level: "Troubleshooting",
      english: "Displays the object type of HEAD.",
      telugu: "HEAD object type ఏమిటో చూపిస్తుంది."
    },
    {
      command: "git cat-file -s HEAD",
      level: "Troubleshooting",
      english: "Displays the size of the HEAD object.",
      telugu: "HEAD object size చూపిస్తుంది."
    },
    {
      command: "git count-objects -vH",
      level: "Troubleshooting",
      english: "Displays human-readable repository object storage statistics.",
      telugu: "Repository object storage statistics ని readable format లో చూపిస్తుంది."
    },
    {
      command: "git config --get core.autocrlf",
      level: "Troubleshooting",
      english: "Checks the configured line-ending conversion setting.",
      telugu: "Line-ending conversion setting configure అయిందో check చేస్తుంది."
    },
    {
      command: "git config --get core.filemode",
      level: "Troubleshooting",
      english: "Checks whether Git tracks executable file mode changes.",
      telugu: "Executable file permission changes ని Git track చేస్తుందో check చేస్తుంది."
    },
    {
      command: "git config --get core.ignorecase",
      level: "Troubleshooting",
      english: "Checks the configured filename case-sensitivity behavior.",
      telugu: "Filename case-sensitivity setting check చేస్తుంది."
    },
    {
      command: "git config --get init.defaultBranch",
      level: "Troubleshooting",
      english: "Checks the default branch name used for new repositories.",
      telugu: "New repositories కోసం default branch name check చేస్తుంది."
    },
    {
      command: "git config --get pull.rebase",
      level: "Troubleshooting",
      english: "Checks whether pull is configured to use rebase.",
      telugu: "Pull సమయంలో rebase configure అయిందో check చేస్తుంది."
    },
    {
      command: "git config --get push.default",
      level: "Troubleshooting",
      english: "Checks the default push behavior.",
      telugu: "Default push behavior ఏంటో check చేస్తుంది."
    },
    {
      command: "git config --get-regexp '^remote\\.'",
      level: "Troubleshooting",
      english: "Lists all remote-related configuration entries.",
      telugu: "Remote కి సంబంధించిన configuration entries అన్నింటినీ చూపిస్తుంది."
    },
    {
      command: "git config --get-regexp '^branch\\.'",
      level: "Troubleshooting",
      english: "Lists branch tracking configuration entries.",
      telugu: "Branch tracking configuration entries చూపిస్తుంది."
    },
    {
      command: "git check-ref-format refs/heads/feature-login",
      level: "Troubleshooting",
      english: "Validates a Git branch reference name.",
      telugu: "Git branch reference name valid గా ఉందో check చేస్తుంది."
    },
    {
      command: "git verify-pack -v .git/objects/pack/pack-*.idx",
      level: "Troubleshooting",
      english: "Checks the contents and integrity information of pack index files.",
      telugu: "Pack index files contents మరియు integrity information check చేస్తుంది."
    },
    {
      command: "git verify-commit HEAD",
      level: "Troubleshooting",
      english: "Verifies the GPG signature of the current commit when present.",
      telugu: "Current commit కి GPG signature ఉంటే దాన్ని verify చేస్తుంది."
    },
    {
      command: "git verify-tag v1.0.0",
      level: "Troubleshooting",
      english: "Verifies the signature of an annotated tag.",
      telugu: "Annotated tag signature ని verify చేస్తుంది."
    },
    {
      command: "git --no-pager log -5 --oneline",
      level: "Troubleshooting",
      english: "Displays recent commits without opening a pager.",
      telugu: "Pager open చేయకుండా recent commits చూపిస్తుంది."
    },
    {
      command: "git --no-optional-locks status",
      level: "Troubleshooting",
      english: "Runs status without optional index lock updates.",
      telugu: "Optional index lock updates లేకుండా status check చేస్తుంది."
    },
    {
      command: "git -c color.ui=false status",
      level: "Troubleshooting",
      english: "Displays repository status with color output disabled.",
      telugu: "Color output disable చేసి repository status చూపిస్తుంది."
    }
  ]
};
