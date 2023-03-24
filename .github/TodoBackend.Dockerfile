FROM mcr.microsoft.com/dotnet/aspnet:6.0

ARG APP_BUILD_VERSION=local-development
ENV APP_BUILD_VERSION=$APP_BUILD_VERSION

WORKDIR /App

COPY dist/apps/todo-api .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]

