FROM jenkins/jenkins:lts-jdk11

RUN jenkins-plugin-cli --plugins nodejs

USER root
RUN apt update -y
RUN apt install nano -y
RUN touch /.profile

RUN mkdir /app
WORKDIR /app

USER jenkins
ENV HOME=/var/jenkins_home

RUN touch $HOME/.profile
RUN touch $HOME/.bash_profile
ENV NVM_DIR=/var/jenkins_home/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
RUN echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' > /var/jenkins_home/.profile
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && source "$NVM_DIR/nvm.sh"' > /var/jenkins_home/.profile
