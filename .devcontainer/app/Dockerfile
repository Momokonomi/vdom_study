FROM ubuntu:20.04

#Ubuntuのコンフィグ変更
RUN useradd -D -s /bin/bash
ENV TZ=Asia/Tokyo
ENV DEBIAN_FRONTEND=noninteractive

#Linuxの便利なコマンドをインストール
RUN apt update && apt upgrade -y
RUN apt-get update && apt-get upgrade -y
RUN apt install -y sudo 
RUN apt-get install -y git iputils-ping curl bash-completion

#日本語入力を可能にする
RUN apt-get install -y locales && locale-gen ja_JP.UTF-8
ENV LANG=ja_JP.UTF-8


#nodeの環境変数
ENV NVM_DIR=/usr/local
ENV NODE_VERSION=18.20.4
RUN mkdir -p $NVM_DIR

#NodeJsとnpm,他依存パッケージのインストール
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
RUN . $NVM_DIR/nvm.sh \
    && nvm install  ${NODE_VERSION} \
    && nvm use ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION}

#nodeの環境変数
ARG nvm_version $(nvm version)
ENV NODE_PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/lib/node_modules"
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}"

#React開発時のホットリロードで必要
ENV WATCHPACK_POLLING=true

#ユーザー設定
ARG USERNAME=dev1
ARG GROUPNAME=dev
ARG UID=1000
ARG GID=1000
ARG PASSWORD=dev
RUN groupadd -g $GID $GROUPNAME && \
    useradd -m -u $UID -g $GID -G sudo $USERNAME && \
    echo $USERNAME:$PASSWORD | chpasswd && \
    echo "$USERNAME   ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER $USERNAME
WORKDIR /home/$USERNAME/