all: env run

env: install_node install_npm install_gulp

run: install_dependencies
	gulp

install_brew:
	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";

install_node: install_brew
	brew install node;

install_npm: install_brew
	brew install npm;

install_gulp: install_npm
	npm install -g gulp

install_dependencies: install_npm
	npm install
