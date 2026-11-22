# คู่มือโปรเจกต์

โปรเจกต์นี้มี 3 ส่วน: Angular แสดงหน้าเว็บ, Spring Boot ให้ REST API และ MongoDB เก็บข้อมูล ในขั้นนี้หน้าเว็บ PetCare เป็น UI ต้นแบบ ส่วน Backend มี API ตัวอย่าง `/api/items` เท่านั้น **ฟอร์มสมัครสมาชิก เข้าสู่ระบบ สมัครร้านค้า และส่งคำถามยังไม่บันทึกลงฐานข้อมูล**

## โฟลเดอร์ไหนเก็บอะไร

```text
D:\SE\project\
├─ frontend/                           หน้าเว็บ Angular
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ app.component.ts/html       ตัวประกอบหน้าเว็บและการสลับหน้า
│  │  │  ├─ features/
│  │  │  │  ├─ home/                  หน้าแรกและบริการยอดนิยม
│  │  │  │  ├─ services/              หน้ารายละเอียดบริการ
│  │  │  │  └─ help/                  ศูนย์ช่วยเหลือ
│  │  │  ├─ shared/
│  │  │  │  ├─ site-header/           เมนูด้านบน
│  │  │  │  ├─ site-footer/           ส่วนท้ายหน้าเว็บ
│  │  │  │  └─ auth-dialog/           หน้าต่างเข้าสู่ระบบ/สมัครสมาชิก
│  │  │  ├─ models/site.model.ts      ชนิดข้อมูลและข้อมูลบริการตัวอย่าง
│  │  │  └─ core/api/item.service.ts  ตัวอย่างโค้ดเรียก API
│  │  ├─ styles.css                  CSS ของหน้าเว็บ
│  │  └─ main.ts                     จุดเริ่มต้น Angular
│  ├─ public/                        ไฟล์ภาพหรือไฟล์สาธารณะในอนาคต
│  ├─ proxy.conf.json                ส่ง /api จากพอร์ต 4200 ไป 8080
│  ├─ angular.json                   ตั้งค่า Angular
│  └─ package.json                   แพ็กเกจและคำสั่ง npm
├─ backend/                            Spring Boot REST API
│  ├─ src/main/java/com/example/project/
│  │  ├─ ProjectApplication.java      จุดเริ่มต้น Backend
│  │  └─ item/                       API ตัวอย่าง
│  │     ├─ ItemController.java       รับ GET/POST /api/items
│  │     ├─ Item.java                 รูปแบบข้อมูล MongoDB
│  │     └─ ItemRepository.java       อ่านและบันทึกข้อมูล
│  ├─ src/main/resources/application.properties  พอร์ตและ MongoDB URI
│  └─ pom.xml                         dependencies ของ Maven
├─ compose.yaml                        ตั้งค่า MongoDB ใน Docker
└─ README.md                           คู่มือไฟล์นี้
```

`node_modules/`, `dist/` และ `target/` เป็นไฟล์ที่เครื่องมือสร้างเอง ไม่ต้องแก้โค้ดในโฟลเดอร์เหล่านี้

## สิ่งที่ต้องมี

- Node.js และ npm สำหรับ Angular
- JDK 17 ขึ้นไป และ Maven สำหรับ Spring Boot
- Docker Desktop สำหรับ MongoDB (หรือ MongoDB Server ที่ติดตั้งไว้เอง)

## วิธีรันบน Windows PowerShell

**เปิด PowerShell หรือ Terminal 3 หน้าต่างแยกกัน** รันตามลำดับด้านล่าง และปล่อยหน้าต่าง Backend กับ Frontend เปิดค้างไว้

### 1. MongoDB — หน้าต่างที่ 1

เปิด Docker Desktop ให้ทำงานก่อน จากนั้น:

```powershell
cd D:\SE\project
docker compose up -d mongodb
docker compose ps
```

ถ้า `docker compose ps` แสดง service `mongodb` เป็น `Up` แปลว่าฐานข้อมูลทำงานที่ `localhost:27017` แล้ว ข้อมูลเก็บใน Docker volume `mongo_data` ถ้าใช้ MongoDB Server ในเครื่องและเปิดพอร์ต 27017 อยู่แล้ว ให้ข้าม Docker ได้

### 2. Backend — หน้าต่างที่ 2

```powershell
cd D:\SE\project\backend
mvn spring-boot:run
```

Backend เปิดที่ `http://localhost:8080` และใช้ฐานข้อมูล `project_db` ตาม `application.properties` ทดสอบเมื่อ Backend ทำงานแล้ว:

```powershell
Invoke-RestMethod http://localhost:8080/api/items
```

หากพบ `mvn : The term 'mvn' is not recognized` เครื่องนี้มี Maven ใน Downloads แต่ยังไม่ได้อยู่ใน PATH ให้รันสองบรรทัดนี้ **ในหน้าต่าง Backend เดิม** ก่อน `mvn spring-boot:run`:

```powershell
$env:Path = 'C:\Users\HP\Downloads\maven-mvnd-1.0.6-windows-amd64\maven-mvnd-1.0.6-windows-amd64\mvn\bin;' + $env:Path
mvn -version
```

การเพิ่ม PATH แบบนี้มีผลเฉพาะหน้าต่างที่รันคำสั่ง เมื่อเปิดหน้าต่างใหม่ต้องทำซ้ำ

### 3. Frontend — หน้าต่างที่ 3

```powershell
cd D:\SE\project\frontend
npm.cmd install
npm.cmd start
```

เปิด [http://localhost:4200](http://localhost:4200) เพื่อดูหน้าเว็บ PetCare ครั้งต่อไปที่แพ็กเกจติดตั้งแล้ว ใช้เพียง `npm.cmd start` ได้ Angular จะรีเฟรชหน้าอัตโนมัติหลังบันทึกไฟล์

## ตรวจข้อมูลใน MongoDB

จาก `D:\SE\project` เปิด shell ของ MongoDB:

```powershell
docker compose exec mongodb mongosh
```

จากนั้นพิมพ์ใน `mongosh`:

```javascript
show dbs
use project_db
show collections
db.items.find()
```

ฐานข้อมูล `project_db` และ collection `items` จะปรากฏเมื่อมีข้อมูลถูกบันทึกครั้งแรก การเปิดหน้าเว็บอย่างเดียวไม่ได้สร้างข้อมูลใน collection นี้ หากต้องการทดสอบการบันทึก API ตัวอย่าง:

```powershell
$body = @{ name = 'รายการทดสอบ'; description = 'ทดลองบันทึก MongoDB' } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:8080/api/items -Method Post -ContentType 'application/json' -Body $body
```

กลับไปพิมพ์ `db.items.find()` ใน `mongosh` จะเห็นรายการที่เพิ่ม

## หยุดการทำงานและแก้การเชื่อมต่อ

- หยุด Frontend หรือ Backend: กด `Ctrl+C` ใน Terminal ของส่วนนั้น
- หยุด MongoDB: ที่ `D:\SE\project` ใช้ `docker compose down` (ข้อมูลใน volume ยังอยู่)
- เปลี่ยน MongoDB URI: ตั้งค่า `$env:MONGODB_URI` ในหน้าต่าง Backend ก่อนรัน Maven หรือแก้ค่าเริ่มต้นใน `backend/src/main/resources/application.properties`
- ตรวจ Frontend: ที่ `frontend/` ใช้ `npm.cmd run build`

ตัวอย่างการตั้ง URI ใน PowerShell:

```powershell
$env:MONGODB_URI = 'mongodb://localhost:27017/project_db'
mvn spring-boot:run
```

อย่าเก็บ URI ที่มีชื่อผู้ใช้และรหัสผ่านลงใน Git
