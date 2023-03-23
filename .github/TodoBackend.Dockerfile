FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY dist/apps/todo-api .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]

