export const realtimeInterviewData = {
  linux: [
    { q: "How do you handle a production server running out of inodes?", a: "We identify directories with high file counts using 'find . -maxdepth 2 -printf '%h\\n' | sort | uniq -c | sort -k 1 -n' and clean up stale cache files or temp logs." }
  ],
  docker: [
    { q: "How do you handle database migration tasks inside a multi-container Docker Swarm or Compose setup?", a: "We use an init-container or a separate migration service block with health checks that runs before the main web application container starts." }
  ],
  aws: [
    { q: "How do you troubleshoot high latency on an AWS Application Load Balancer (ALB)?", a: "Check ALB target group response times, examine backend instance CPU/memory utilization, and review access logs for slow backend responses." }
  ],
  kubernetes: [
    { q: "How do you handle persistent storage data loss or detachment during node failures in EKS?", a: "We use CSI (Container Storage Interface) drivers with multi-AZ resilient EBS volumes or EFS, ensuring automatic volume re-attachment on healthy worker nodes." }
  ],
  // Alaane migatha 14 tools ki kuda ikkade add chesukovachu bayya!
};
