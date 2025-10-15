FROM bitnami/spark:3.5.0

USER root

# Install SBT
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" | tee /etc/apt/sources.list.d/sbt.list && \
    echo "deb https://repo.scala-sbt.org/scalasbt/debian /" | tee /etc/apt/sources.list.d/sbt_old.list && \
    curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add && \
    apt-get update && \
    apt-get install -y sbt && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /opt/spark-jobs

# Copy build files
COPY build.sbt .
COPY project ./project

# Download dependencies
RUN sbt update

# Copy source code
COPY src ./src

# Build the project
RUN sbt clean compile assembly

# Set environment variables
ENV SPARK_HOME=/opt/bitnami/spark

# Default command
CMD ["bash"]
