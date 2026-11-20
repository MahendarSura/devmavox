# Lab 05 — Prometheus alert lifecycle

Start the stack. Open http://localhost:9090/alerts and http://localhost:9093. Confirm checkout scrape is UP.

Trigger slow requests for more than the rule's 30-second pending duration:
    for i in $(seq 1 100); do curl -s 'http://localhost:8080/checkout?delay=1800' >/dev/null & done
    wait

Observe the rule move INACTIVE to PENDING to FIRING. Inspect Alertmanager. Stop slow traffic and wait for the rate window and evaluation to return below threshold; verify the alert resolves.

Student tasks: explain expression, for duration, labels and annotations; record pending and firing times; explain why a short spike may not fire; propose a less noisy threshold.

Pass evidence: actual Prometheus alert state and Alertmanager resolution, not a static status badge.

Assessment: start with `bash /workspace/scripts/lab-assess.sh start alerts`, then finish with `bash /workspace/scripts/lab-assess.sh verify <lab-id>`. Evidence is stored locally in the terminal volume, not synced to Vercel.
