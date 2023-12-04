import { A } from "../components/A";

export function Footer() {

   const d = new Date();
   let year = d.getFullYear();

   return (
      <div className="footer">
         Trabalho de BD&trade;
         <br />
         Todos os direitos reservados &copy; {year}
         <br />
         <br />
         Developed by
         <br />
         <A href="https://github.com/MDellaCS" target="_blank" value="Matheus Della" />
         <A href="https://404" target="_blank" value="Hugo Koketu" />
         <A href="https://github.com/purcinodev" target="_blank" value="Arthur Purcino" />
         <A href="https://github.com/leorufinx" target="_blank" value="Leonardo Rufino" />
      </div>
   )
}