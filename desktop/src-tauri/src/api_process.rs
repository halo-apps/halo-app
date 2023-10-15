use std::path::PathBuf;
use std::process::{Command};
use crate::settings;

//放在create中，启动进程，程序结束后，进程会自动被销毁
pub fn start() -> u32 {
  //获取配置文件内容
  let settings = settings::get_settings();
  // println!("{:?}", settings);

  let api_path = PathBuf::from("resources/api/");
  // println!("{:?}", api_path);

  // let (sender, receiver) = channel();

  //进程链断掉，接口进程会变成顶端进程
  let program: String = String::from("resources/api/Hona.Api.exe");
  let mut command = Command::new(program);
  command.args(settings.args);
  command.current_dir(api_path);

  //不是在闭包中返回的变量，才可以作为mut可变量
  let child = command.spawn().unwrap();
  let id = child.id();
  println!("接口服务进程ID：{}", id);
  id
}

//退出进程
pub fn stop(id: u32) {
  let mut kill = Command::new("cmd");
  kill.arg("taskkill")
    .arg("/F")
    .arg("/IM")
    .arg("-PID")
    .arg(&id.to_string());

  println!("KILL进程ID：{}", id);
  let _child = kill.spawn();
  match _child {
    Ok(_) => {
      println!("退出成功");
    }
    Err(e) => {
      println!("退出失败：{}?", e)
    }
  }
}