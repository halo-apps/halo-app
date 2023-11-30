plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
  //Maven发布包
  id("maven-publish")
}

//发布Maven插件
publishing {
  publications {
    create<MavenPublication>("release") {
      from(components.findByName("release"))
      groupId = "com.hona-app.android"
      artifactId = "com.hona.android"
      version = "1.0.0"
    }
  }
  repositories {
    mavenLocal()
//    maven {
//      url = uri("https://s01.oss.sonatype.org/content/repositories/snapshots")
//      credentials {
//        username = project.findProperty("ossrhUsername") as? String
//        password = project.findProperty("ossrhPassword") as? String
//      }
//    }
  }
}

android {
  //发布签名配置
  signingConfigs {
    getByName("debug") {
      storeFile = file("..\\key")
      storePassword = "123456"
      keyPassword = "123456"
      keyAlias = "key0"
    }
  }
  namespace = "com.hona.android"
  compileSdk = 34

  defaultConfig {
    applicationId = "com.hona.android"
    minSdk = 33
    targetSdk = 34
    versionCode = 1
    versionName = "1.0"

    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }

  buildTypes {
    release {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
    }
  }
  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_1_8
    targetCompatibility = JavaVersion.VERSION_1_8
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
  buildFeatures {
    viewBinding = true
  }
}

dependencies {
  //依赖项会被添加到最终的apk文件中
  implementation("androidx.core:core-ktx:1.9.0")
  implementation("androidx.appcompat:appcompat:1.6.1")
  implementation("com.google.android.material:material:1.8.0")
  implementation("androidx.constraintlayout:constraintlayout:2.1.4")
  implementation("androidx.navigation:navigation-fragment-ktx:2.5.3")
  implementation("androidx.navigation:navigation-ui-ktx:2.5.3")
  implementation("androidx.webkit:webkit:1.8.0")
  testImplementation("junit:junit:4.13.2")
  androidTestImplementation("androidx.test.ext:junit:1.1.5")
  androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}