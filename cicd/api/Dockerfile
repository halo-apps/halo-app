FROM registry.cn-shanghai.aliyuncs.com/hona_base/aspnet:7.0 AS base
WORKDIR "/app"

FROM registry.cn-shanghai.aliyuncs.com/hona_base/dotnet_sdk:7.0 AS build
WORKDIR "/src"
#把整个api项目，复制到当前工作目录
COPY "../../api" .
RUN ls -ld $PWD/*
WORKDIR "Hona.Api"
RUN dotnet restore "Hona.Api.csproj"
RUN dotnet build "Hona.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Hona.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR "/app"
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Hona.Api.dll"]

EXPOSE 80 443