# Alfred workflow: Open Visual Studio Code project

This tiny [Alfred](https://www.alfredapp.com/) workflow ``alfred-open-vsc-project`` allows you to conveniently open a project via Visual Studio Code by defining a "workspace" folder (e.g. the folder where all your projects are). It then shows you all folder names and lets you filter them.

On selecting one, Visual Studio Code will automatically open with the selected project.

Note: This can easily be customized to open the project with another IDE/editor. Just edit the workflow's last step in Alfred to use another command then ``code``.

## Demo

![alfred-open-vsc-project in action](screenshot.png)

## Installation

1. Download the ``alfred-open-vsc-project.alfredworkflow`` from Releases.
2. Drag-and-drop it to your Alfred workflows.
3. Set up the ``PROJECT_FOLDER`` variable. 

## Usage

1. Type ``code`` into Alfred. It should show you your projects.
2. Select one with ``Enter``.
3. Voilá, Visual Studio Code now opens with your selected project!

## Development

This workflow basically consists of a simple python script.

You can build the workflow yourself with ``make build``.

## Todos and Ideas

1. Open Terminal/iTerm in the project folder at the same time. (I tried to do this, but I didn't manage to make it work)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details