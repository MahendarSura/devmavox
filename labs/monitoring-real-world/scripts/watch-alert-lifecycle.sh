#!/usr/bin/env bash
# Run during the incident and recovery; stores real Prometheus alert-state transitions.
set -euo pipefail
OUT="$HOME/.lab-state/alert-lifecycle.json"; mkdir -p "$(dirname "$OUT")"; [[ -f "$OUT" ]] || echo '[]' > "$OUT"
echo "Recording alert state changes. Stop after alert returns to inactive."
while true; do
 D="$(curl -fsS 'http://prometheus:9090/api/v1/rules?type=alert')"
 S="$(jq -r '[.data.groups[].rules[]|select(.type=="alerting")|.state]|if any(.=="firing") then "firing" elif any(.=="pending") then "pending" else "inactive" end' <<<"$D")"
 LAST="$(jq -r '.[-1].state // empty' "$OUT")"
 if [[ "$S" != "$LAST" ]]; then T="$OUT.tmp"; jq --arg state "$S" --argjson at "$(date +%s)" '. += [{state:$state,observed_at:$at}]' "$OUT" > "$T"; mv "$T" "$OUT"; echo "$(date -u +%FT%TZ) $S"; fi
 sleep 5
done
