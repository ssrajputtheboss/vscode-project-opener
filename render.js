const child_process = require('child_process');
const Store = require('electron-store');
const store = new Store();
const pathRegex = /[\s\w\-:\/\\.]+/;
if (!store.has('projects')) {
  store.set('projects', []);
}
let projectList = store.get('projects');

function createProjects() {
  const container = document.getElementById('container');
  container.innerHTML = projectList
    .map(
      (project, index) => `
  <div
  id="head"
  style="
    margin: 5px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border: 2px solid #0f0f0f;
  "
>
  <h3>${project.name}</h3>
  <button id="open${index}" style="padding:5px;" onclick="openProject(event)">OPEN PROJECT</button>
  <button id="delete${index}" style="background-color:black;color:white;padding:5px;" onclick="deleteProject(event)">DELETE PROJECT</button>
</div>
  `
    )
    .join('\n');
}

function addProject(event) {
  data = {
    name: document.getElementById('name').value,
    path: document.getElementById('path').value
  };
  if (!data.name || projectList.findIndex((e) => e.name === data.name) !== -1) {
    return alert('Project name already exists or empty');
  }
  if (!(data.path.match(pathRegex)[0] === data.path)) {
    return alert('The path should follow regex [\\s\\w\\-:\\/\\\\.]+');
  }
  projectList.push(data);
  store.set('projects', projectList);
  createProjects();
}

function openProject(e) {
  const i = Number(e.target.id.toString().replace('open', ''));
  const obj = projectList[i];
  child_process.execSync(`code "${obj.path}"`);
}

function deleteProject(e) {
  const i = Number(e.target.id.toString().replace('delete', ''));
  projectList.splice(i, 1);
  store.set('projects', projectList);
  createProjects();
}
