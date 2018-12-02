// Part 1
// get Checksum
// input: list of box IDs
// Output: checksum
function getCheckSum (boxes) {
  let twiceCount = 0;
  let thriceCount = 0;
  boxes.forEach(boxID => {
    const letterCounts = {};
    const letters = boxID.split('');
    letters.forEach(letter => {
      letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
    })
    const uniqueLetters = Object.keys(letterCounts);
    let checkTwice = true;
    let checkThrice = true;
    for (let i=0; i < uniqueLetters.length; i++) {
      if (checkTwice && letterCounts[uniqueLetters[i]] === 2) {
        twiceCount++;
        checkTwice = false;
      } 
      else if (checkThrice && letterCounts[uniqueLetters[i]] === 3) {
        thriceCount++;
        checkThrice = false;
      }
    }
  })
  console.log(twiceCount * thriceCount);
}

// Part 2
// Getting Common Letters from two boxes which differ by 1 char in same position.
function getCommonLetters (boxes) {
  let commonLetters = '';
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      let box1 = boxes[i];
      let box2 = boxes[j];
      let differs = [];
      let boxSize = box1.length; // all have equal size.
      for (let k = 0; k < boxSize; k++) {
        if (box1[k] !== box2[k]) {
          differs.push(k);
        }
      }
      if (differs.length === 1) {
        commonLetters = frameCommonLetters(box1, differs[0]);
        break;
      }
    }
    if (commonLetters) {
      break;
    }
  }
  console.log(commonLetters);
}

function frameCommonLetters(boxID, differIdx) {
  let commonLetters = '';
  [...boxID].forEach((letter, index) => {
    if (index !== differIdx) {
      commonLetters += letter;
    }
  })
  return commonLetters;
}

let boxes = ['ohvflkatysoimjxbunazgwcdpr','ohoflkctysmiqjxbufezgwcdpr', 'ohvflkatysciqwxfunezgwcdpr', 'fhvflyatysmiqjxbunazgwcdpr', 'ohvhlkatysmiqjxbunhzgwcdxr', 'ohvflbatykmiqjxbunezgscdpr', 'ohvflkatasaiqjxbbnezgwcdpr', 'ohvflkatyymiqjxrunetgwcdpr', 'ohvflkatbsmiqhxbunezgwcdpw', 'oheflkytysmiqjxbuntzgwcdpr', 'ohvflkatrsmiqjibunezgwcupr', 'ohvflkaiysmiqjxbunkzgwkdpr', 'ohvilkutysmiqjxbuoezgwcdpr', 'phvflkatysmkqjxbulezgwcdpr', 'ohvflkatnsmiqjxbznezgpcdpr', 'ohvylkatysriqjobunezgwcdpr', 'ohvflkatytmiqjxbunezrwcypr', 'ohvonkatysmiqjxbunezgwxdpr', 'ohvflkatgsmoqjxyunezgwcdpr', 'ohvflkbtqsmicjxbunezgwcdpr', 'ohvflkatysmgqjqbunezgwcdvr', 'ohvtlkatyrmiqjxbunezgwcdpi', 'ohvflkatyskovjxbunezgwcdpr', 'ohvflkayysmipjxbunezgwcdpu', 'ohvalkltysmiqjxbunezgecdpr', 'ohvflkatysmiqjxiunezgnndpr', 'ohvflkatyomiqjxbbnezgwcdpp', 'ohvflkatysmiqjxbuoezgncdpy', 'omvflkvtysmiqjxwunezgwcdpr', 'ohvflkatynmicjxbunezgwpdpr', 'ohvflkatyqmaqjxbunezvwcdpr', 'ohbfhkatysmiqjxbunezgwcdqr', 'ohvflkatesmiqjvbunezpwcdpr', 'ohvflkatysmsqjxiunezgwcdhr', 'ohvfjkatysmwqjxbunezgwcddr', 'ohvflkanysmiqjxbunwkgwcdpr', 'ohqflkatysmiqjxbuuezgwcddr', 'ohvflkatysmvqjxbznlzgwcdpr', 'ohvflkatysmiqjxbunjzwwqdpr', 'ohvfjkatysmiqxxbunezgwcupr', 'chvfxkatysmiqjxxunezgwcdpr', 'uhvflkatitmiqjxbunezgwcdpr', 'ohvflbatysmiqjxbuntzgwcdor', 'ohvflkmtysmmqjxbunexgwcdpr', 'ohvflsatysmyqjxjunezgwcdpr', 'ohvfskatysmiqjjbunezgwcdpg', 'ohvflkatysniqjxbunexgwcrpr', 'ohvfekatysmiqjxbunedswcdpr', 'ohvfltatysmjqjxbunezghcdpr', 'ohvflkatydmiqjxvunezggcdpr', 'oavflkatysmiqjxtunazgwcdpr', 'ohvflkltysmiqjxbuzeugwcdpr', 'ohbflkatysmiqjybuuezgwcdpr', 'ehvfzkatysmiqjxbuhezgwcdpr', 'odvflkatssmiqjxbunezgwcdpj', 'ohvflkatysmiqjzbufezgwbdpr', 'jhvflkdtysmiqqxbunezgwcdpr', 'ohvflkatysmiqjwbunengwcnpr', 'ohvfskatysmiqjxbxuezgwcdpr', 'ohvflkatysmiqjobvnezgwcrpr', 'ohvrlkatysmiqjxbwnezgrcdpr', 'ofvflkatysmiqjxbunezpwcdwr', 'ohvfxdatyomiqjxbunezgwcdpr', 'yhvflkatydmiqjxbubezgwcdpr', 'ohvflkatysdiqjxbuneztwcspr', 'ohvflkatydmiquxbunezgwcbpr', 'ohvflkatysmiqcxbukezgwcdwr', 'ohvflkntasmiqjxbunezghcdpr', 'lhvflkatysmiqjxbunezqwckpr', 'ehifikatysmiqjxbunezgwcdpr', 'ohvflkatysmiqjcbutezgwcdpm', 'ohvflkatjssiqrxbunezgwcdpr', 'oyvflkavysmiqjxlunezgwcdpr', 'orvflkgtysmiqjxbukezgwcdpr', 'ihvflkatysmiqaxbunpzgwcdpr', 'ohvflkatusmiqjxbbnezgwchpr', 'ohvflkatysbiqjxvuneugwcdpr', 'ohvflkatysmiqjcbungzgwcwpr', 'ovvflkatysmidjxbunezgscdpr', 'ohvflqatysmiljxbunfzgwcdpr', 'ghvfokatysmiqjxbunqzgwcdpr', 'nxvflkatysmxqjxbunezgwcdpr', 'ohvflkatysmiqjxbexezgwrdpr', 'ohvfrkatysmhqjxbuntzgwcdpr', 'ohvflkvtysmiqjxocnezgwcdpr', 'ohvglkgtysmiqjxnunezgwcdpr', 'ohvflkatysmnqjxbunecgwqdpr', 'oyvflkatysgiqjxbcnezgwcdpr', 'ofvflkatysmiqjxbunfzgwcdpg', 'otvflkttysmiqjxbunezgwmdpr', 'ohvflkvtysmiqjbbunezgzcdpr', 'ahvflkatysyiqjxbunezvwcdpr', 'ohiflkatysmydjxbunezgwcdpr', 'ohvfwkatysmvqjxbunezwwcdpr', 'ohvflkatysbiqjxbunergwodpr', 'hhvsdkatysmiqjxbunezgwcdpr', 'ihvflkwtysmiqjxbunezgacdpr', 'ohvfljatysmiqcxbunuzgwcdpr', 'ohvflkatysqiqlwbunezgwcdpr', 'ohvflkauysmkqjxwunezgwcdpr', 'ohvflkatysmoqjqbunezgwodpr', 'ohvslkvtysmipjxbunezgwcdpr', 'olvflkatysmiujxbunezgwctpr', 'osvflxatysmiqjxbenezgwcdpr', 'orvflkhtysmiqjxbinezgwcdpr', 'ohcflkatystiqjxbunezbwcdpr', 'ohcflkatyfmifjxbunezgwcdpr', 'ohvflkatdsmiqjxbrnezgwcdpt', 'ohvflkatysmiqjxbwnqzawcdpr', 'oevflkakysmiqjxbunezgwcdpt', 'ofvflkatysmiqjxbunbqgwcdpr', 'ohvflkatysmdqjxbunefqwcdpr', 'ohvklkalysmiqjxbunezgwcepr', 'ocvflhatysmiqjxbunezzwcdpr', 'uhvflkatysmiqmxbunezgwcxpr', 'ohvflkatyshikjhbunezgwcdpr', 'lbvflkatysmoqjxbunezgwcdpr', 'ohvflkatssmuqjxbunezgscdpr', 'ohvflkatysmifyxbuvezgwcdpr', 'ohvfikatysmiqjxbunezgwfupr', 'ohvmlkaiysmiqjxqunezgwcdpr', 'ohvflkatysmiqjxiunpzgwcdpo', 'lhvflkatysmpqjxbenezgwcdpr', 'ohvflkatysmiqjobunengwczpr', 'ohoflkatysniqjxbunezgccdpr', 'ohvfxkatysmiqjgbunyzgwcdpr', 'ohvflkytysmiljxbubezgwcdpr', 'hhvsdkatysmiqjxjunezgwcdpr', 'ohvflkatysmiqjtuunezgwcdpt', 'ohvfdkxtysmiqjubunezgwcdpr', 'ohxflkatysmiyjxbunezgwcdhr', 'ohvflkatysmiqjibunezgwcppd', 'ohvflkatysmihjxbunezgwcdhj', 'ohvflkatysmiqjxronezgwcdvr', 'ofrflxatysmiqjxbunezgwcdpr', 'ohvwlkatysmiqjxounezgscdpr', 'ohvflkatcodiqjxbunezgwcdpr', 'oqvflkatysmiqjxbunebgwmdpr', 'ohvflmatysmisjxbunezqwcdpr', 'ovvflkatysmiqjxbuxezgwcdpe', 'ohvflkatysmdejxbuneztwcdpr', 'hhvflkathsmiqjxbwnezgwcdpr', 'ohkflkatlsmsqjxbunezgwcdpr', 'ohvflkktysmizjxhunezgwcdpr', 'ohzflkatysmiqjrbunezgwcdpj', 'ohuflwatysmiqjxbunezgwcdgr', 'ohvflkatysmiqvxmunpzgwcdpr', 'xhvflkwtysmiqjxbunezgwjdpr', 'whvflkatysmiqjxbunezgzcopr', 'ohvflkayysmiqjxuznezgwcdpr', 'khvflkasysmiqjxbunezgwcdpv', 'ohvflkatylmiqjxbpnozgwcdpr', 'ohvflkgtysziqjxbunezgwgdpr', 'ohvfljaiysmiqjxbuvezgwcdpr', 'ohvflkxtyslizjxbunezgwcdpr', 'ohzflkatysmiqjxbcnezgwcdar', 'ohvflkatysmiqjxbisecgwcdpr', 'shvflkatyjmiqjkbunezgwcdpr', 'mhvflkatysmiqjxvunezgwcdpk', 'ohfflkatysmiqjxbunczgwcppr', 'ohvflkatysmiqjkzunezgwcdpc', 'ohvflkatysmifjxbuneygwctpr', 'ohvflkatysmimjbbunezgwcdpe', 'ohvflkatjsciqjxbunezgwcdpa', 'ohvxlkatysmitjxbunezswcdpr', 'ohvslkatfsmiqjxbunezgwudpr', 'ohvflkatysmiqexbugezgwcdnr', 'onvflkatysmiqjxkunezgtcdpr', 'fhsflkalysmiqjxbunezgwcdpr', 'oyvflkatysmiqjobxnezgwcdpr', 'ohvflkatysmiqjxbunezswgdvr', 'phvflkatyymiqjxvunezgwcdpr', 'oivflzutysmiqjxbunezgwcdpr', 'ohvflkftysmiqjxbunezkwcopr', 'ohvflkatysmwnjxbunezgwcdpp', 'ohvflkatysmiqkxcunezgwndpr', 'phvklkatysmiqjhbunezgwcdpr', 'ohvflrawysmiqjxbunhzgwcdpr', 'ohvflkatysmiqjxbunecgwcdig', 'ohvflpakysmiqjxbunezgwrdpr', 'odvflkatykmiqjxbunezglcdpr', 'ohtflkatysiiqjxblnezgwcdpr', 'lhvfpkatysmiqjxbupezgwcdpr', 'ohvflkatdsmiqjpbunezgwcdps', 'ohvflkztysmiqjxvunezgwjdpr', 'ohvflbatysmxqoxbunezgwcdpr', 'ohvklkaigsmiqjxbunezgwcdpr', 'ohvfgkawysmiqjxbunezgwcdur', 'ohvflkatyskpqjlbunezgwcdpr', 'ohvflkatyqmiqjhbupezgwcdpr', 'ohqflkatysmiqjxzonezgwcdpr', 'ohxfnkatyymiqjxbunezgwcdpr', 'ohmflkatpsmiqjxbunezgwcdpw', 'ohvflkatysmiqjibnnewgwcdpr', 'vevflkatysmiqjxbunezgwcypr', 'ohvflkatydmiqwxbungzgwcdpr', 'ohsrlkatysmiqjxbcnezgwcdpr', 'ohvflkptyvmiqexbunezgwcdpr', 'opzflkatysmiqjxrunezgwcdpr', 'ohvflkitysmiqjxcunezgwcmpr', 'ohvflkatysmhhjxblnezgwcdpr', 'ohvflkatysfiqjxbunrzgwmdpr', 'ohvflkatyamibjxbunezgwcdpf', 'ohvflkalysmigjxbunezggcdpr', 'ohvflkatwsmisjxbunezgdcdpr', 'dhvflkatysmlqjxbunszgwcdpr', 'ohvflkatysmiqjxbueeygwcbpr', 'ohvflkatgsmiqjnbunezhwcdpr', 'svvflkatysmiqjxbunezgwckpr', 'opvflkatysmiqpxbufezgwcdpr', 'ohnvlkatysmiqjxbunezglcdpr', 'phvflkutysjiqjxbunezgwcdpr', 'ohvflabtysmiqjjbunezgwcdpr', 'ouvflkatysmiqjsbunezgwcdpk', 'osvflkatysmijjxbunezgwcypr', 'owvflkatysmiqjxbukxzgwcdpr', 'ohvfliatvsmiljxbunezgwcdpr', 'ohvflkatysmiqjxbumezbwtdpr', 'ohvflkatyfcicjxbunezgwcdpr', 'ohvflkatysmiqldbunezgfcdpr', 'oqvflkatysmiqixkunezgwcdpr', 'ohvflkatysmiqjxbulezgicdpe', 'ohvflkatysmiqjxbuniegwcdpl', 'ohvflkatysmiqjwbunbzgwcdhr', 'ohvflkatysmiqjdbunezgwwdkr', 'ohqflkytysmiqjxbunezgwcdpc', 'ohvflkatysmigjxbunezqwwdpr', 'ohvfloatysmiqjpbumezgwcdpr', 'ohvklkathkmiqjxbunezgwcdpr', 'ohvflkstjsmiqjxbunezgwctpr', 'ohvvlkatysmiqjxbunewgwcdir', 'ohnflkatysmiqjxbunszgwcdlr', 'ohvflkatysmnqjxbunezgxcdlr', 'ohvfrkatysmiqjxbonezgwcdor', 'ihvflkatysmiqjxbuneogwcxpr', 'ohvflkatysmiqjxbunecgwcccr', 'owvflkatysmivjxbunezgwjdpr', 'ohvflkgtysmiqjxbunczhwcdpr', 'ohyqlkatysmiqjxbunezgwcypr', 'ohvflkatysmiqjvbunezuwcdpw', 'ohvflkathsmiqmxbuoezgwcdpr', 'ehvjlkajysmiqjxbunezgwcdpr', 'ohvflkltysmiqjxblnezgwjdpr', 'oovflkvtfsmiqjxbunezgwcdpr', 'olvfzkatysmiqjxyunezgwcdpr', 'ohvflkatysqitjxbunezgncdpr', 'yhvflkatysmkqjxbunazgwcdpr', 'zlvolkatysmiqjxbunezgwcdpr', 'ohvflpatysmiqjxbunezgwcapb', 'ohvflkatysmuqjxbunezgfcdur'];

getCheckSum(boxes);
getCommonLetters(boxes);
