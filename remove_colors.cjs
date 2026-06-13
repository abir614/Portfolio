const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if(file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}
const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace text icon colors in Skills
  content = content.replace(/color:\s*"text-[a-z]+-\d+"/g, 'color: "text-base-content"');
  
  // Replace project card badge colors
  content = content.replace(/JavaScript:\s*"bg-yellow-400"/g, 'JavaScript: "bg-base-300"');
  content = content.replace(/TypeScript:\s*"bg-blue-600"/g, 'TypeScript: "bg-base-300"');
  content = content.replace(/HTML:\s*"bg-orange-600"/g, 'HTML: "bg-base-300"');
  content = content.replace(/CSS:\s*"bg-purple-600"/g, 'CSS: "bg-base-300"');
  content = content.replace(/Python:\s*"bg-green-600"/g, 'Python: "bg-base-300"');
  content = content.replace(/Java:\s*"bg-red-600"/g, 'Java: "bg-base-300"');
  content = content.replace(/React:\s*"bg-cyan-500"/g, 'React: "bg-base-300"');
  content = content.replace(/Node:\s*"bg-green-600"/g, 'Node: "bg-base-300"');
  content = content.replace(/Tailwind:\s*"bg-teal-500"/g, 'Tailwind: "bg-base-300"');
  
  // Replace linear gradients and text-transparent
  content = content.replace(/bg-linear-to-[a-z]+\s+from-[^\s"]+\s+(via-[^\s"]+\s+)?to-[^\s"]+/g, 'bg-base-200');
  content = content.replace(/bg-linear-to-[a-z]+\s+from-[^\s"]+\s+to-[^\s"]+/g, 'bg-base-200');
  content = content.replace(/text-transparent bg-clip-text/g, 'text-base-content');
  content = content.replace(/bg-clip-text text-transparent/g, 'text-base-content');
  
  // Specific contact buttons
  content = content.replace(/from-blue-600 to-blue-700 text-white/g, 'bg-base-200 text-base-content border border-base-300');
  content = content.replace(/from-red-600 to-red-700 text-white/g, 'bg-base-200 text-base-content border border-base-300');
  content = content.replace(/from-green-500 to-green-600 text-white/g, 'bg-base-200 text-base-content border border-base-300');
  content = content.replace(/from-blue-500 to-blue-600 text-white/g, 'bg-base-200 text-base-content border border-base-300');
  
  // Replace group-hover linear gradients
  content = content.replace(/group-hover:bg-linear-to-[a-z]+\s+group-hover:from-[^\s"]+\s+group-hover:to-[^\s"]+/g, 'group-hover:bg-base-300');
  
  fs.writeFileSync(file, content);
});
console.log('Done');
