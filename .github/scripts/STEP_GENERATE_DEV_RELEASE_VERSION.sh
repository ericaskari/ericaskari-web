#!/bin/sh
set -e

git config --global --add safe.directory '*'

DEV_BRANCH_NAME="dev"
BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"

ALL_RELEASES="$(aws ecr describe-images --repository-name ericaskari-backend --query 'sort_by(imageDetails,& imagePushedAt)[*].imageTags' --output json)"
LAST_PROD_RELEASE="$(echo "$ALL_RELEASES" | jq --arg reg_exp "^([v])(\d+)(\.)(\d+)(\.)(\d+)$" -r '. | add | reverse | map(select(. | test($reg_exp))) | .[0]')"

echo "LAST_PROD_RELEASE:            $LAST_PROD_RELEASE"

if [ "$LAST_PROD_RELEASE" = 'null' ]; then
    printf "\nNo prod releases. Creating first tag.\n\n"

    LAST_PROD_RELEASE="v1.0.0"

    echo "LAST_PROD_RELEASE:            $LAST_PROD_RELEASE"
fi

LAST_DEV_RELEASE="$(echo "$ALL_RELEASES" | jq --arg reg_exp "^($LAST_PROD_RELEASE)(\-)($DEV_BRANCH_NAME)(\.)(\d+)$" -r '. | add | reverse | map(select(. | test($reg_exp))) | .[0]')"

echo "LAST_DEV_RELEASE:             $LAST_DEV_RELEASE"

if [ "$LAST_DEV_RELEASE" = 'null' ]; then
    printf "No dev releases after last prod release. Creating first tag.\n\n"

    LAST_DEV_RELEASE="$LAST_PROD_RELEASE-$DEV_BRANCH_NAME.0"

    echo "LAST_DEV_RELEASE:             $LAST_DEV_RELEASE"
fi

echo "DEV     BRANCH:               $DEV_BRANCH_NAME"
echo "CURRENT BRANCH:               $BRANCH_NAME"

sed -i='backup' -e "s|$(cat ./package.json | jq -r '.version')|${LAST_DEV_RELEASE}|" ./package.json

#NEW_DEV_RELEASE="$(npm version prerelease --allow-same-version --git-tag-version false --preid $BRANCH_NAME)"
NEW_DEV_RELEASE="$(npm version minor --allow-same-version --git-tag-version false --preid $BRANCH_NAME)"

echo "NEW_DEV_RELEASE:              $NEW_DEV_RELEASE"
echo "$NEW_DEV_RELEASE"           > ./.DEV_VERSION
