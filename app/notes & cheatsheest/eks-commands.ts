
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

export const eksTool: DevOpsTool = {
  name: "Amazon EKS (eksctl)",
  category: "Cloud & Kubernetes",
  commands: [
    // BASIC - 5
    ...makeCommands("Basic", [
      [
        "eksctl version",
        "Displays the installed eksctl version.",
        "Install ayina eksctl version chupistundi.",
      ],
      [
        "eksctl get cluster",
        "Lists EKS clusters in the configured AWS region.",
        "Configured AWS region lo EKS clusters list chestundi.",
      ],
      [
        "eksctl get cluster --name=my-cluster",
        "Displays information about a specific EKS cluster.",
        "Specific EKS cluster information chupistundi.",
      ],
      [
        "eksctl get nodegroup --cluster=my-cluster",
        "Lists nodegroups belonging to an EKS cluster.",
        "EKS cluster ki sambandhinchina nodegroups list chestundi.",
      ],
      [
        "eksctl get nodegroup --cluster=my-cluster --output=yaml",
        "Displays nodegroup information in YAML format.",
        "Nodegroup information YAML format lo chupistundi.",
      ],
    ]),

    // INTERMEDIATE - 6
    ...makeCommands("Intermediate", [
      [
        "eksctl create cluster --name=my-cluster --region=ap-south-1",
        "Creates an EKS cluster with a managed nodegroup using the specified name and region.",
        "Specified name mariyu region tho EKS cluster create chestundi.",
      ],
      [
        "eksctl create cluster --config-file=cluster.yaml",
        "Creates an EKS cluster using a configuration file.",
        "Configuration file use chesi EKS cluster create chestundi.",
      ],
      [
        "eksctl create nodegroup --cluster=my-cluster --name=my-nodegroup",
        "Creates an additional nodegroup in an existing EKS cluster.",
        "Existing EKS cluster lo additional nodegroup create chestundi.",
      ],
      [
        "eksctl scale nodegroup --cluster=my-cluster --name=my-nodegroup --nodes=3 --nodes-min=1 --nodes-max=5 --wait",
        "Scales a nodegroup to the requested capacity and waits for completion.",
        "Nodegroup ni requested capacity ki scale chesi completion kosam wait chestundi.",
      ],
      [
        "eksctl drain nodegroup --cluster=my-cluster --name=my-nodegroup",
        "Drains nodes in a nodegroup by evicting their workloads.",
        "Nodegroup nodes nundi workloads ni evict chesi drain chestundi.",
      ],
      [
        "eksctl drain nodegroup --cluster=my-cluster --name=my-nodegroup --undo",
        "Reverses the nodegroup drain operation by uncordoning its nodes.",
        "Nodegroup drain operation reverse chesi nodes ni uncordon chestundi.",
      ],
    ]),

    // ADVANCED - 5
    ...makeCommands("Advanced", [
      [
        "eksctl upgrade cluster --name=my-cluster",
        "Checks and plans an available EKS control plane upgrade.",
        "Available EKS control plane upgrade ni check chesi plan chestundi.",
      ],
      [
        "eksctl upgrade cluster --name=my-cluster --approve",
        "Applies the planned EKS control plane upgrade.",
        "Plan chesina EKS control plane upgrade apply chestundi.",
      ],
      [
        "eksctl upgrade nodegroup --cluster=my-cluster --name=my-nodegroup",
        "Upgrades the specified nodegroup.",
        "Specified nodegroup ni upgrade chestundi.",
      ],
      [
        "eksctl create iamserviceaccount --cluster=my-cluster --namespace=default --name=my-service-account --attach-policy-arn=arn:aws:iam::123456789012:policy/MyPolicy --approve",
        "Creates an IAM service account associated with the EKS cluster.",
        "EKS cluster ki associate ayina IAM service account create chestundi.",
      ],
      [
        "eksctl utils associate-iam-oidc-provider --cluster=my-cluster --approve",
        "Associates an IAM OIDC identity provider with the EKS cluster.",
        "EKS cluster ki IAM OIDC identity provider associate chestundi.",
      ],
    ]),

    // TROUBLESHOOTING - 5
    ...makeCommands("Troubleshooting", [
      [
        "eksctl get cluster --name=my-cluster --region=ap-south-1",
        "Checks whether the specified EKS cluster is discoverable in the selected region.",
        "Selected region lo specified EKS cluster available ga undo check chestundi.",
      ],
      [
        "eksctl get nodegroup --cluster=my-cluster --output=json",
        "Displays detailed nodegroup information in JSON format for diagnosis.",
        "Diagnosis kosam detailed nodegroup information JSON format lo chupistundi.",
      ],
      [
        "eksctl utils describe-stacks --cluster=my-cluster --region=ap-south-1",
        "Displays CloudFormation stacks associated with the EKS cluster.",
        "EKS cluster ki sambandhinchina CloudFormation stacks chupistundi.",
      ],
      [
        "eksctl drain nodegroup --cluster=my-cluster --name=my-nodegroup --disable-eviction",
        "Drains a nodegroup without respecting PodDisruptionBudget eviction restrictions.",
        "PodDisruptionBudget eviction restrictions lekunda nodegroup drain chestundi.",
      ],
      [
        "eksctl drain nodegroup --cluster=my-cluster --name=my-nodegroup --undo",
        "Restores scheduling on nodes after a drain operation.",
        "Drain operation tarvata nodes meeda scheduling restore chestundi.",
      ],
    ]),
  ],
};
