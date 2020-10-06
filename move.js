/* eslint-disable */
const fs = require("fs");
const path = require("path");

const from = path.resolve(__dirname, "./dist");
const to = path.resolve(__dirname, "../common-server/public");

del(path.resolve(__dirname, "../common-server/public/page_static"));
copy(from, to);

function copy(fromPath, toPath) {
  fs.access(toPath, (err) => {
    if (err) {
      fs.mkdirSync(toPath);
    }
  });
  fs.readdir(fromPath, (err, paths) => {
    if (err) {
      console.error(err);
      return;
    }
    paths.forEach((item) => {
      const newFromPath = fromPath + "/" + item;
      const newToPath = toPath + "/" + item;

      fs.stat(newFromPath, function(err, stat) {
        if (err) return;
        if (stat.isFile()) {
          fs.copyFileSync(newFromPath, newToPath);
          console.log(newToPath);
        }
        if (stat.isDirectory()) {
          copy(newFromPath, newToPath);
        }
      });
    });
  });
}

function del(path, reservePath) {
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path);
      files.forEach((file) => {
        const currentPath = path + "/" + file;
        if (fs.statSync(currentPath).isDirectory()) {
          del(currentPath, reservePath);
        } else {
          fs.unlinkSync(currentPath);
        }
      });
      if (path !== reservePath) {
        fs.rmdirSync(path);
      }
    } else {
      fs.unlinkSync(path);
    }
  }
}
