How to clone:
- buka visual studio code
- clone project ini terlebih dahulu:
    git config --global user.name name_kalian
    git config --global user.email email_kalian
    git clone https://github.com/octa_vany/paypass.git
- di gitlab, aku ud buat branch masing2 buat kalian, sama branch dev
- kalo pas kalian clone ga ada branch kalian, coba jalanin: git fetch

How to push:
- ganti jadi branch kalian dulu di visual studio code nya
- stage file nya
- commit dulu (tulis message nya sejelas mungkin kalian ubah apa aja), 
    kalo mau commit dari vscode pilih dari pilihan di kiri itu yg dibawah icon search
    masukkin commit message nya di textfield yang ada disitu. trus ctrl+enter
- jangan lupa pull dari dev dulu dengan cara: git fetch origin dev (buat cek ada change apa di dev). terus pull dari origin dev. 
    kalo ga ngerti ntar tanya langsung aja. kalo ada conflict di solve dlu sebelum di push.
- push ke branch kalian
- merge request ke dev
- ntar octa push dari dev ke master

How to pull:
- waktu mau pull dari dev, jangan lupa commit dulu ya
- pull from dev
- kalo ada conflict di solve dlu
