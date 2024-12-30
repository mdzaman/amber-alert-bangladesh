# Bangladesh Amber Alert System - Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Infrastructure Deployment](#infrastructure-deployment)
4. [Database Setup](#database-setup)
5. [Application Deployment](#application-deployment)
6. [Monitoring Setup](#monitoring-setup)
7. [Security Configuration](#security-configuration)
8. [Testing & Validation](#testing--validation)
9. [Production Checklist](#production-checklist)

## Prerequisites

### Required Tools
```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Install Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

### AWS Configuration
```bash
# Configure AWS credentials
aws configure
AWS Access Key ID: [Your Access Key]
AWS Secret Access Key: [Your Secret Key]
Default region name: ap-southeast-1
Default output format: json
```

## Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-org/amber-alert-system.git
cd amber-alert-system
```

### 2. Create Environment Files
```bash
# Development environment
cp .env.example .env.development
# Staging environment
cp .env.example .env.staging
# Production environment
cp .env.example .env.production
```

### 3. Configure VPC and Networking
```bash
cd terraform/networking
terraform init
terraform plan -out=network.tfplan
terraform apply "network.tfplan"
```

## Infrastructure Deployment

### 1. EKS Cluster Setup
```bash
cd terraform/eks
terraform init
terraform plan -var-file=environment/production.tfvars -out=eks.tfplan
terraform apply "eks.tfplan"
```

### 2. Update Kubernetes Config
```bash
aws eks update-kubeconfig --name amber-alert-cluster --region ap-southeast-1
```

### 3. Deploy Core Infrastructure
```bash
# Deploy Nginx Ingress Controller
kubectl apply -f kubernetes/ingress-nginx/

# Deploy Cert Manager
kubectl apply -f kubernetes/cert-manager/

# Deploy Prometheus & Grafana
kubectl apply -f kubernetes/monitoring/
```

## Database Setup

### 1. RDS Instance Deployment
```bash
cd terraform/rds
terraform init
terraform plan -var-file=environment/production.tfvars -out=rds.tfplan
terraform apply "rds.tfplan"
```

### 2. Initialize Database Schema
```bash
# Connect to RDS instance
export PGPASSWORD='your-password'
psql -h your-rds-endpoint -U postgres -d postgres

# Create databases
CREATE DATABASE amber_alert_prod;
CREATE DATABASE amber_alert_analytics;

# Apply schema migrations
cd database/migrations
./run-migrations.sh production
```

## Application Deployment

### 1. Build Docker Images
```bash
# Build API Service
docker build -t amber-alert-api:latest -f docker/api/Dockerfile .
docker tag amber-alert-api:latest your-ecr-repo/amber-alert-api:latest

# Build Frontend
docker build -t amber-alert-frontend:latest -f docker/frontend/Dockerfile .
docker tag amber-alert-frontend:latest your-ecr-repo/amber-alert-frontend:latest

# Push images to ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin your-ecr-repo
docker push your-ecr-repo/amber-alert-api:latest
docker push your-ecr-repo/amber-alert-frontend:latest
```

### 2. Deploy Applications
```bash
# Update Kubernetes configs with new image tags
cd kubernetes/applications

# Deploy API service
kubectl apply -f api/
kubectl rollout status deployment/amber-alert-api

# Deploy Frontend
kubectl apply -f frontend/
kubectl rollout status deployment/amber-alert-frontend
```

## Monitoring Setup

### 1. Configure Prometheus
```bash
# Deploy Prometheus Operator
kubectl apply -f kubernetes/monitoring/prometheus-operator/

# Configure Service Monitors
kubectl apply -f kubernetes/monitoring/service-monitors/

# Configure Alert Rules
kubectl apply -f kubernetes/monitoring/alert-rules/
```

### 2. Configure Grafana
```bash
# Deploy Grafana
kubectl apply -f kubernetes/monitoring/grafana/

# Import Dashboards
kubectl apply -f kubernetes/monitoring/grafana/dashboards/
```

## Security Configuration

### 1. SSL/TLS Setup
```bash
# Generate SSL Certificate using Let's Encrypt
kubectl apply -f kubernetes/cert-manager/certificates/production.yaml

# Configure Ingress with SSL
kubectl apply -f kubernetes/ingress/production.yaml
```

### 2. Network Policies
```bash
# Apply Network Policies
kubectl apply -f kubernetes/network-policies/

# Configure WAF Rules
aws wafv2 create-web-acl --cli-input-json file://aws/waf/web-acl.json
```

## Testing & Validation

### 1. Run Health Checks
```bash
# Check all deployments
kubectl get deployments -A

# Check all services
kubectl get services -A

# Check SSL certificates
kubectl get certificates -A
```

### 2. Run Load Tests
```bash
# Install k6
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Run load tests
k6 run tests/load/api-test.js
```

## Production Checklist

### 1. Final Verifications
- [ ] All environment variables are correctly set
- [ ] Databases are properly backed up
- [ ] SSL certificates are valid
- [ ] Monitoring alerts are configured
- [ ] Load balancers are properly configured
- [ ] Security groups are properly set
- [ ] WAF rules are in place
- [ ] Backup and restore procedures are tested
- [ ] Scaling policies are configured
- [ ] Rate limiting is enabled

### 2. Documentation
- [ ] Update API documentation
- [ ] Update system architecture diagrams
- [ ] Document deployment procedures
- [ ] Update monitoring dashboards
- [ ] Document incident response procedures

### 3. Security
- [ ] Run security scan
- [ ] Enable audit logging
- [ ] Configure backup retention
- [ ] Set up intrusion detection
- [ ] Enable DDoS protection

### 4. Performance
- [ ] Configure auto-scaling
- [ ] Set up CDN
- [ ] Enable caching
- [ ] Configure rate limiting
- [ ] Set up load balancing

## Rollback Procedures

If deployment fails, follow these steps:

1. **Rollback Application**
```bash
# Rollback to previous version
kubectl rollout undo deployment/amber-alert-api
kubectl rollout undo deployment/amber-alert-frontend
```

2. **Rollback Database**
```bash
# Restore from latest snapshot
aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier amber-alert-db \
    --db-snapshot-identifier latest-snapshot
```

3. **Verify Services**
```bash
# Check service health
kubectl get pods
kubectl logs -f deployment/amber-alert-api
kubectl logs -f deployment/amber-alert-frontend
```

## Support and Maintenance

### Regular Maintenance Tasks
1. Database backups verification
2. Log rotation and cleanup
3. SSL certificate renewal
4. Security patches and updates
5. Performance optimization

### Monitoring and Alerts
1. Set up PagerDuty integration
2. Configure alert thresholds
3. Set up escalation policies
4. Document incident response

### Scaling Procedures
1. Configure HPA (Horizontal Pod Autoscaling)
2. Set up node auto-scaling
3. Configure database read replicas
4. Implement caching strategies

For support:
- Emergency Contact: +880 XXXXXXXXX
- Email: support@amberalert.gov.bd
- Documentation: https://docs.amberalert.gov.bd
