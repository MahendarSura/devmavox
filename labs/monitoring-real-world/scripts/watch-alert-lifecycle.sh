#!/usr/bin/env bash
# Record per-rule Prometheus state transitions for the real alert lifecycle exercise.
set -euo pipefail
OUT="$HOME/.lab-state/alert-lifecycle.json"
mkdir -p "$(dirname "$OUT")"
[[ -f "$OUT" ]] || echo '[]' > "$OUT"
jq -e 'type == "array"' "$OUT" >/dev/null || { echo "Invalid lifecycle evidence file: $OUT" >&2; exit 1; }
echo "Recording per-alert state changes. Stop after CheckoutHighP95Latency returns to inactive."
while true; do
  RESPONSE="$(curl -fsS 'http://prometheus:9090/api/v1/rules?type=alert')"
  ROWS="$(jq -c '[.data.groups[].rules[] | select(.type=="alerting") | {alert:.name,state:.state}]' <<<"$RESPONSE")"
  while IFS= read -r ROW; do
    ALERT="$(jq -r '.alert' <<<"$ROW")"
    STATE="$(jq -r '.state' <<<"$ROW")"
    LAST="$(jq -r --arg alert "$ALERT" '[.[] | select(.alert==$alert)] | last | .state // empty' "$OUT")"
    if [[ "$STATE" != "$LAST" ]]; then
      TMP="$OUT.tmp"
      jq --arg alert "$ALERT" --arg state "$STATE" --argjson at "$(date +%s)" '. += [{alert:$alert,state:$state,observed_at:$at}]' "$OUT" > "$TMP"
      mv "$TMP" "$OUT"
      echo "$(date -u +%FT%TZ) $ALERT $STATE"
    fi
  done < <(jq -c '.[]' <<<"$ROWS")
  sleep 5
done
