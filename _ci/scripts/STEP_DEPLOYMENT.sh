#!/bin/sh
set -e

VERSION="$(cat .VERSION)"
export VERSION

FE_TAG="438380764554.dkr.ecr.eu-west-1.amazonaws.com/ericaskari-frontend:$VERSION"
BE_TAG="438380764554.dkr.ecr.eu-west-1.amazonaws.com/ericaskari-backend:$VERSION"

export FE_TAG
export BE_TAG

echo "NAMESPACE                 $NAMESPACE"
echo "VERSION                   $VERSION"
echo "FE_TAG                    $FE_TAG"
echo "BE_TAG                    $BE_TAG"
echo "BE_DOMAIN                 $BE_DOMAIN"
echo "FE_DOMAIN_ONE             $FE_DOMAIN_ONE"
echo "FE_DOMAIN_TWO             $FE_DOMAIN_TWO"

yq e -i '.spec.template.spec.containers[0].image=env(BE_TAG)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "VERSION")).value=env(VERSION)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_HOST")).value=env(NODE_MAILER_HOST)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_PORT")).value=env(NODE_MAILER_PORT)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_SSL")).value=env(NODE_MAILER_SSL)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_AUTH_USER")).value=env(NODE_MAILER_AUTH_USER)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_AUTH_PASS")).value=env(NODE_MAILER_AUTH_PASS)' ./_ci/deployment/backend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "NODE_MAILER_SECURE")).value=env(NODE_MAILER_SECURE)' ./_ci/deployment/backend-02-deployment.yml
yq e -i ".spec.template.spec.containers[0].image=env(FE_TAG)" ./_ci/deployment/frontend-02-deployment.yml
yq e -i '(.spec.template.spec.containers[0].env[] | select(.name == "VERSION")).value=env(VERSION)' ./_ci/deployment/frontend-02-deployment.yml
yq e -i '.spec.tls[0].hosts[0]=env(FE_DOMAIN_ONE)' ./_ci/deployment/frontend-04-ingress.yml
yq e -i '.spec.tls[0].hosts[1]=env(FE_DOMAIN_TWO)' ./_ci/deployment/frontend-04-ingress.yml
yq e -i '.spec.rules[0].host=env(FE_DOMAIN_ONE)' ./_ci/deployment/frontend-04-ingress.yml
yq e -i '.spec.rules[1].host=env(FE_DOMAIN_TWO)' ./_ci/deployment/frontend-04-ingress.yml

kubectl create namespace "$NAMESPACE" || true

kubectl delete secret --namespace="$NAMESPACE" regcred || true
kubectl create secret docker-registry regcred --namespace="$NAMESPACE" --docker-server=438380764554.dkr.ecr.eu-west-1.amazonaws.com --docker-username=AWS --docker-password="$(aws ecr get-login-password)" || true

#kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/shared-01-mirror-secret-production.yaml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/backend-01-secret.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/backend-02-deployment.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/backend-03-service.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/frontend-01-secret.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/frontend-02-deployment.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/frontend-03-service.yml
kubectl apply --namespace="$NAMESPACE" --filename=./_ci/deployment/frontend-04-ingress.yml
