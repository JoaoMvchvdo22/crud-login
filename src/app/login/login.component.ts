import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../service/utils.service';

interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  picture?: string;
}

interface DoneTask {
  id?: number;
  name?: string;
  realized?: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserDTO = {
    name: '',
    email: '',
    password: '',
    username: '',
    picture: ''
  };

  passwordType: boolean = true;
  isEditUser: boolean = false;
  openModal: boolean = false;
  noTasks: boolean = false;

  pageType: string = 'createUser';
  name: string = '';
  eMail: string = '';
  userName: string = '';
  password: string = '';
  token: string = '';
  nameEdited: string = '';
  eMailEdited: string = '';
  taskName: string = '';
  taskResponse: any = [];
  taskDate: string = '';
  isRealized: number = 0;
  taskId: number = 0;
  userId: number = 0;
  id: number = 0;

  constructor(private utilsService: UtilsService) { }

  ngOnInit() {
  }

  changePasswordType() {
    this.passwordType = !this.passwordType;
  }

  toCreateUser(type: string) {
    this.pageType = type;
  }

  toEnter() {
    let loginBody: UserDTO = {
      password: this.password,
      username: this.userName,
    }
    this.utilsService.login(loginBody).subscribe((res) => {
      if (res.message == 'Incorrect username and\/or password') {
        alert('Usuário ou senha incorretos');
        return;
      } else {
        let responseLogin: any = res;
        this.name = responseLogin.name;
        this.eMail = responseLogin.email;
        this.id = responseLogin.id;
        this.token = responseLogin.token;
        this.pageType = 'logged';
      }
      alert('Login efetuado com sucesso');
      this.listTasks();
    });
  }

  toSave() {
    let userBody: UserDTO = {
      name: this.name,
      email: this.eMail,
      password: this.password,
      username: this.userName,
    }

    this.utilsService.createUser(userBody).subscribe((res) => {
      if (res.message == 'User Already Exists') {
        alert('Usuário já existe');
        return;
      } else {
        alert('Usuário criado com sucesso');
        this.pageType = 'login';
      }
    });
  }

  toEditUser() {
    this.isEditUser = !this.isEditUser;
  }

  updateUser() {
    let userEdit = {
      name: this.nameEdited,
      email: this.eMailEdited,
      password: this.password,
      username: this.userName,
      picture: ''
    }
    this.utilsService.updateUser(userEdit, this.token).subscribe((res) => {
      if (res.message == 'User Successfully Updated') {
        alert('Usuário atualizado com sucesso');
      }
    });
    this.isEditUser = false;
    this.name = this.nameEdited;
  }

  deleteUser() {
    let userDelete = {
      username: this.userName,
      password: this.password,
    }
    this.utilsService.deleteUser(userDelete, this.token).subscribe((res) => {
      if (res.message == 'User Successfully Deleted') {
        alert('Usuário removido com sucesso');
      }
      this.pageType = 'createUser';
      this.userName = '';
      this.password = '';
    });
  }

  createTask() {
    let task = {name: this.taskName};
    this.utilsService.createTask(task, this.token).subscribe((res) => {
      if (res.message == 'Task Successfully Added') {
        alert('Tarefa criada com sucesso');
      }
      this.listTasks();
    });
    this.openModal = false;
    this.noTasks = false;
  }

  toCreateTask() {
    this.openModal = !this.openModal;
    this.taskName = '';
  }

  listTasks() {
    this.noTasks = true;
    this.utilsService.getTasks(this.token).subscribe(
      (res) => {
        if (res.length > 0) {
        this.taskResponse = res;
        this.taskResponse.forEach((task: any) => {
          this.taskId = task.id;
          this.taskName = task.name;
          this.taskDate = task.date;
          this.isRealized = task.isRealized;
          this.userId = task.userId;
        });
        this.noTasks = false;
      }
    });
  }

  doneTask(task: any) {
    let realized: DoneTask = {
      id: task.id,
      name: task.name,
      realized: 1
    }
    this.utilsService.doneTask(realized, this.token).subscribe((res) => {
      if (res.message == 'Task Successfully Updated') {
        alert('Tarefa marcada com sucesso');
      }
      this.listTasks();
    });
  }

  editTaskId(task: any) {
    let taskId = {
      id : task.id
    };

    this.utilsService.editTaskId(taskId, this.token).subscribe((res) => {
      console.log(res, 'Não entendi o motivo desse edit(perguntar para o professor)');
    })
  }

  deleteTask(task: any) {
    let taskId = {
      id : task.id
    }
    this.utilsService.deleteTask(taskId, this.token).subscribe((res) => {
      if (res.message == 'Task deleted Successfully') {
        alert('Tarefa removida com sucesso');
      }
      this.listTasks();
    })
  }

}
