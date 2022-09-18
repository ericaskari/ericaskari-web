#!/bin/sh
set -e
git config --global --add safe.directory '*'

DEV_BRANCH_NAME="dev"
BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
ALL_RELEASES="$(aws ecr describe-images --repository-name ericaskari-backend --query 'sort_by(imageDetails,& imagePushedAt)[*].imageTags' --output json)"
OLD_PROD_RELEASE="$(echo "$ALL_RELEASES" | jq --arg reg_exp "^([v])(\d+)(\.)(\d+)(\.)(\d+)$" -r '. | add | reverse | map(select(. | test($reg_exp))) | .[0]')"

if [ "$OLD_PROD_RELEASE" = 'null' ]; then
    printf "\nNo prod releases. Creating first tag.\n\n"
    OLD_PROD_RELEASE="v1.0.0"
fi

OLD_DEV_RELEASE="$(echo "$ALL_RELEASES" | jq --arg reg_exp "^($OLD_PROD_RELEASE)(\-)($DEV_BRANCH_NAME)(\.)(\d+)$" -r '. | add | reverse | map(select(. | test($reg_exp))) | .[0]')"

if [ "$OLD_DEV_RELEASE" = 'null' ]; then
    printf "No dev releases after last prod release. Creating first tag.\n\n"
    OLD_DEV_RELEASE="$OLD_PROD_RELEASE-$DEV_BRANCH_NAME.0"
fi

sed -i='backup' -e "s|$(cat ./package.json | jq -r '.version')|${OLD_DEV_RELEASE}|" ./package.json
NEW_DEV_RELEASE="$(npm version minor --allow-same-version --git-tag-version false --preid $BRANCH_NAME)"

sed -i='backup' -e "s|$(cat ./package.json | jq -r '.version')|${OLD_PROD_RELEASE}|" ./package.json
NEW_PROD_RELEASE="$(npm version minor --allow-same-version --git-tag-version false)"


echo "DEV BRANCH:         $DEV_BRANCH_NAME"
echo "CURRENT BRANCH:     $BRANCH_NAME"

echo "OLD_PROD_RELEASE:   $OLD_PROD_RELEASE"
echo "NEW_PROD_RELEASE:   $NEW_PROD_RELEASE"
echo "OLD_DEV_RELEASE:    $OLD_DEV_RELEASE"
echo "NEW_DEV_RELEASE:    $NEW_DEV_RELEASE"

echo "::set-output name=OLD_PROD_RELEASE::$OLD_PROD_RELEASE"
echo "::set-output name=NEW_PROD_RELEASE::$NEW_PROD_RELEASE"
echo "::set-output name=OLD_DEV_RELEASE::$OLD_DEV_RELEASE"
echo "::set-output name=NEW_DEV_RELEASE::$NEW_DEV_RELEASE"
