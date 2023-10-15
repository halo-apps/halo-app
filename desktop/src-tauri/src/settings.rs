use serde::{Serialize, Deserialize};

//配置实体
#[derive(Serialize, Deserialize, Debug)]
pub struct Settings {
  pub api: String,
  pub args: Vec<String>,
}

//获取配置实体
pub fn get_settings() -> Settings {
  let settings_content = tauri::api::file::read_string("settings.json").unwrap();
  let settings: Settings = serde_json::from_str(&settings_content).unwrap();
  settings
}