import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const waktu = moment().tz('Asia/Jakarta');

const tampilTanggal = waktu.format('dddd DD MMMM YYYY');
const tampilWaktu = `Jam : ${waktu.format('HH:mm:ss')}`;
let tampilHari = '';

if (waktu.hours() >= 0 && waktu.hours() < 3) {
  tampilHari = 'Malam';
} else if (waktu.hours() < 12) {
  tampilHari = 'Pagi';
} else if (waktu.hours() < 18) {
  tampilHari = 'Siang';
} else {
  tampilHari = 'Sore';
}

const handler = async (m, { conn, usedPrefix: _p, args, command, text }) => {
  let who;
  if (m.isGroup) who = m.mentionedJid0 ? m.mentionedJid0 : m.quoted ? m.quoted.sender : text;
  else who = m.chat;
  if (!who) throw 'Balas pesannya';
  conn.sendMessage(m.chat, { text: `TRANSAKSI BERHASIL\n\nTANGGAL : ${tampilTanggal}\nJAM : ${tampilWaktu} WIB\nSTATUS : Berhasil\n\nPesanan @${m.quoted.sender.split('@')[0]} Berhasil!`, contextInfo: { mentionedJid: [m.quoted.sender] }})
}

handler.help = ['done <Reply Message>'];
handler.tags = ['store'];
handler.customPrefix = /^(done)$/i
handler.group = true;
handler.admin = true;
handler.command = new RegExp();

export default handler;