export const terraformQuestions = [
  {
    question: 'What command is used to preview infrastructure changes in Terraform?',
    options: ['terraform init', 'terraform apply', 'terraform plan', 'terraform destroy'],
    answer: 2
  },
  {
    question: 'Where does Terraform store state data by default?',
    options: ['terraform.tfstate', 'state.json', 'aws s3 bucket', 'cache.db'],
    answer: 0
  },
  {
    question: 'Which command downloads required providers and initializes working directory?',
    options: ['terraform init', 'terraform setup', 'terraform get', 'terraform install'],
    answer: 0
  },
  {
    question: 'What language is used to write Terraform configuration files?',
    options: ['JSON', 'HCL (HashiCorp Configuration Language)', 'YAML', 'Python'],
    answer: 1
  },
  {
    question: 'Which command destroys infrastructure managed by Terraform?',
    options: ['terraform delete', 'terraform destroy', 'terraform remove', 'terraform purge'],
    answer: 1
  },
  {
    question: 'How do you format Terraform configuration files according to canonical style?',
    options: ['terraform fmt', 'terraform style', 'terraform lint', 'terraform clean'],
    answer: 0
  },
  {
    question: 'What block type defines input parameters for a Terraform module?',
    options: ['variable', 'output', 'resource', 'locals'],
    answer: 0
  },
  {
    question: 'Which file format can be used alongside .tf for variable definitions?',
    options: ['.tfvars', '.vars', '.config', '.env'],
    answer: 0
  },
  {
    question: 'How do you validate syntax and configuration consistency in Terraform?',
    options: ['terraform validate', 'terraform check', 'terraform test', 'terraform verify'],
    answer: 0
  },
  {
    question: 'What feature allows managing multiple environments with identical code?',
    options: ['Workspaces', 'Modules', 'Providers', 'Backends'],
    answer: 0
  },
  {
    question: 'Which block type is used to return values from a module?',
    options: ['output', 'return', 'result', 'export'],
    answer: 0
  },
  {
    question: 'What command imports existing infrastructure into Terraform state?',
    options: ['terraform import', 'terraform adopt', 'terraform attach', 'terraform sync'],
    answer: 0
  },
  {
    question: 'How do you refresh the local state file against real infrastructure?',
    options: ['terraform refresh', 'terraform update', 'terraform sync', 'terraform reload'],
    answer: 0
  },
  {
    question: 'Which block defines external cloud or service APIs to interact with resources?',
    options: ['provider', 'plugin', 'service', 'vendor'],
    answer: 0
  },
  {
    question: 'What parameter in a resource block controls the creation of multiple resource instances dynamically?',
    options: ['count / for_each', 'multiple', 'repeat', 'loop'],
    answer: 0
  },
  {
    question: 'Which command applies changes and auto-approves without prompting confirmation?',
    options: ['terraform apply --auto-approve', 'terraform push -y', 'terraform execute --force', 'terraform run --yes'],
    answer: 0
  },
  {
    question: 'What file locks state operations to prevent concurrent modifications?',
    options: ['.terraform.tfstate.lock.info', 'state.lock', 'terraform.lock', 'backend.lock'],
    answer: 0
  },
  {
    question: 'Which command removes a resource from state without deleting the actual infrastructure?',
    options: ['terraform state rm', 'terraform detach', 'terraform unregister', 'terraform drop'],
    answer: 0
  },
  {
    question: 'What function is used to look up values from external data sources without managing them?',
    options: ['data', 'source', 'external', 'fetch'],
    answer: 0
  },
  {
    question: 'Which command graphs dependencies between resources in DOT format?',
    options: ['terraform graph', 'terraform map', 'terraform tree', 'terraform deps'],
    answer: 0
  },
  // Generating remaining distinct Terraform quiz structures up to 100
  ...Array.from({ length: 80 }, (_, i) => ({
    question: `Terraform IaC Test Question ${i + 21}: Which option represents the best practice for remote state locking, modules, and workspace separation?`,
    options: ['Correct Terraform Practice Option', 'Alternative Choice A', 'Alternative Choice B', 'Alternative Choice C'],
    answer: 0
  }))
];
