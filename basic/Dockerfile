# Use the official .NET SDK for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["basic.csproj", "./"]
RUN dotnet restore

# Copy the rest of the application source code
COPY . .

# Publish the application to the /app folder
RUN dotnet publish -c Release -o /app

# Use the runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app .

# Run the application
ENTRYPOINT ["dotnet", "basic.dll"]