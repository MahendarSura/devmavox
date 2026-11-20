#!/bin/sh
set -eu
if [ -z "${LAB_TERMINAL_PASSWORD:-}" ]; then
  echo "LAB_TERMINAL_PASSWORD is required. Set it in .env before starting the lab terminal."
  exit 1
fi
mkdir -p /home/student/.kube
cat > /home/student/.bashrc <<'EOF'
export KUBECONFIG=/home/student/.kube/config
echo "DevMavox live Kubernetes terminal"
echo "Try: kubectl get nodes -o wide"
echo "Lab guides: /workspace/guides"
if [ ! -f "$KUBECONFIG" ]; then
  echo "Kubeconfig not mounted yet. Run scripts/create-cluster.sh on the host, then restart the terminal service."
fi
EOF
cat > /home/student/.bash_profile <<EOF
[ -f /home/student/.bashrc ] && . /home/student/.bashrc
cd /workspace 2>/dev/null || true
EOF
exec ttyd --writable --port 7681 --credential "${LAB_TERMINAL_USERNAME:-student}:${LAB_TERMINAL_PASSWORD}" bash --login
