'use strict'; 

/*
  Okay so I wanted the results visible without digging in the console every time.
  This little helper logs to both console and a <pre> on the page.
*/
const outEl = document.getElementById('out');
function logLine(msg) {
  const text = String(msg);
  console.log(text);
  if (outEl) outEl.textContent += text + '\n'; // using textContent on purpose (safer than innerHTML)
}

/* ============================================================
   PART 1: FIZZ BUZZ
   Reasoning:
   - plain for loop from 1..100
   - use % to test divisibility
   - I check (3 && 5) first so I don’t print two lines by accident
   - using continue just to keep the ifs a little cleaner
============================================================ */
function runFizzBuzz() {
  logLine('--- Part 1: Fizz Buzz ---');

  for (let i = 1; i <= 100; i++) {
    const by3 = (i % 3 === 0);
    const by5 = (i % 5 === 0);

    if (by3 && by5) { // 15s
      logLine('Fizz Buzz');
      continue;
    }
    if (by3) {
      logLine('Fizz');
      continue;
    }
    if (by5) {
      logLine('Buzz');
      continue;
    }

    // not a multiple of 3 or 5
    logLine(i);
  }

  logLine('--- End Part 1 ---\n');
}

/* ============================================================
   PART 2: PRIME TIME
   Notes to self:
   - Beginner version: to check if a number p is prime, try dividing
     by all numbers from 2 up to p-1. If anything divides evenly, not prime.
   - This is not the fastest, but reads super clear and matches the assignment level.
============================================================ */
function isPrime(p) {
  if (p <= 1) return false; // by definition, primes are > 1
  for (let d = 2; d < p; d++) {
    if (p % d === 0) {
      return false; // found a divisor, so it’s composite
    }
  }
  return true; // no divisors found
}

/*
  I interpreted “next prime” as strictly greater than n.
  So if n=5, we return 7 (not 5).
*/
function nextPrimeAfter(n) {
  let candidate = n + 1;
  while (true) { // will break by returning
    if (isPrime(candidate)) {
      return candidate;
    }
    candidate = candidate + 1; // try the next one
  }
}

function runPrimeTime() {
  logLine('--- Part 2: Prime Time ---');

  // trying the examples they gave plus one extra
  let n = 9;
  logLine('n = ' + n + ' -> next prime: ' + nextPrimeAfter(n));

  n = 4;  logLine('n = 4  -> ' + nextPrimeAfter(n)); // expect 5
  n = 5;  logLine('n = 5  -> ' + nextPrimeAfter(n)); // expect 7
  n = 10; logLine('n = 10 -> ' + nextPrimeAfter(n)); // expect 11

  // quick self-check: 11 should give 13
  n = 11; logLine('n = 11 -> ' + nextPrimeAfter(n)); // expect 13

  logLine('--- End Part 2 ---\n');
}

/* ============================================================
   PART 3: FEELING LOOPY (CSV parser)
   What I’m doing:
   - Walk the string character by character with for...of
   - Build up 4 “cells” for each row until I hit a comma or newline
   - When I see '\n' I log the row and reset
   - Ignore '\r' so Windows line endings (\r\n) don’t mess me up
   Why not split()? The lab wants loop practice, so I’m doing it manually.
============================================================ */
function parseAndLogCSV(csv) {
  logLine('--- Part 3: Feeling Loopy ---');

  // temp row cells (exactly 4 per the instructions)
  const cellCount = 4;
  let cells = Array(cellCount).fill('');
  let which = 0; // index of the cell we’re currently filling: 0..3

  function flushRow() {
    // don’t print empty trailing row if input ends w/ newline
    if (cells.some(cell => cell !== '')) {
      // keeping it simple like the prompt suggests
      logLine(cells.join(' '));
    }
    // reset for next row
    cells = Array(cellCount).fill('');
    which = 0;
  }

  for (const ch of csv) {
    if (ch === '\n') {
      flushRow();
      continue;
    }
    if (ch === '\r') {
      // ignore \r. I’ll let \n actually finish the row.
      continue;
    }
    if (ch === ',') {
      which++;
      if (which >= cellCount) which = cellCount - 1; // if there are extra commas, cap at last cell
      continue;
    }

    // normal character, append to the active cell
    cells[which] += ch;
  }

  // if the string didn’t end with \n, make sure to print the last row
  flushRow();
  // if the string didn’t end with \n, make sure to print the last row
  flushRow();

  logLine('--- End Part 3 ---\n');
}

/* ============================================================
   Run everything (I like seeing it all at once first)
============================================================ */
runFizzBuzz();
runPrimeTime();

// sample CSV #1 (people)
const csv1 = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";
parseAndLogCSV(csv1);

// sample CSV #2 (springs data)
const csv2 = "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";
parseAndLogCSV(csv2);

/*
  Test I tried  (for the grader / for me later):
  - document.title, !!document.getElementById('out'), location.href
  - [...document.scripts].map(s => s.src || '(inline)')
  - runFizzBuzz();   
  -nextPrimeAfter(4);   // expect 5
  -nextPrimeAfter(5);   // expect 7
  -isPrime(29); 
*/
