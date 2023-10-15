#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

mod settings;
mod api_process;

use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayEvent, SystemTrayMenuItem};
use tauri::Manager;

fn main() {
  let child = api_process::start();

  //托盘图标
  let show = CustomMenuItem::new("hide".to_string(), "打开");
  let exit = CustomMenuItem::new("exit".to_string(), "退出");

  let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(exit);
  let system_tray = SystemTray::new()
    .with_menu(tray_menu);

  tauri::Builder::default()
    .setup(|_app| {
      let _main_window = _app.get_window("main").unwrap();
      // main_window.open_devtools();
      // println!("启动成功");
      // api_process.kill().unwrap();
      // println!("结束成功");

      // let env = app.env();
      // println!("{:?}", env);

      Ok(())
    })
    .system_tray(system_tray)
    .on_system_tray_event(move |app, event| {
      match event {
        SystemTrayEvent::LeftClick { position: _, size: _, .. } => {
          let window = app.get_window("main").unwrap();
          window.show().unwrap();
          window.unminimize().unwrap();
          window.set_focus().unwrap();
          println!("system tray received a left click");
        }
        SystemTrayEvent::RightClick { position: _, size: _, .. } => {
          println!("system tray received a right click");
        }
        SystemTrayEvent::DoubleClick { position: _, size: _, .. } => {
          println!("system tray received a double click");
        }
        SystemTrayEvent::MenuItemClick { id, .. } => {
          match id.as_str() {
            "show" => {
              let window = app.get_window("main").unwrap();
              window.show().unwrap();
            }
            "exit" => {
              api_process::stop(child);
              std::process::exit(1);
            }
            _ => {}
          }
        }
        _ => {}
      }
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}