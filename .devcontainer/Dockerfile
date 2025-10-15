# Minimal, stable dev image with JDK 17 + Scala + sbt (via SDKMAN)
FROM mcr.microsoft.com/devcontainers/base:bookworm

# Create non-root user (Codespaces standard)
ARG USERNAME=vscode
ARG UID=1000
ARG GID=1000
RUN if ! id -u ${USERNAME} >/dev/null 2>&1; then \
      groupadd -g ${GID} ${USERNAME} && useradd -m -s /bin/bash -u ${UID} -g ${GID} ${USERNAME}; \
    fi

# Essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl zip unzip ca-certificates gnupg git bash-completion \
    && rm -rf /var/lib/apt/lists/*

# SDKMAN for managing Java / Scala / sbt
USER ${USERNAME}
ENV SDKMAN_DIR=/home/${USERNAME}/.sdkman
RUN curl -s "https://get.sdkman.io" | bash && \
    bash -lc "source $SDKMAN_DIR/bin/sdkman-init.sh && \
              sdk install java 17.0.11-tem && \
              sdk install sbt && \
              sdk install scala"

# Make tools available in all shells
RUN echo 'source "$HOME/.sdkman/bin/sdkman-init.sh"' >> /home/${USERNAME}/.bashrc

# Back to root to set permissions
USER root
RUN chown -R ${USERNAME}:${USERNAME} /home/${USERNAME}
USER ${USERNAME}
