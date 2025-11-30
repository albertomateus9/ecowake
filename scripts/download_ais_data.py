#!/usr/bin/env python3
"""Download automático de CSVs da Transpetro do Google Drive"""
import os
import requests
import sys

FILES = {
    "BRUNO LIMA.csv": "1KlJYqseMH5mGK7rbQ4dbbX7hKXy5R0Tb",
    "CARLA SILVA.csv": "1va7V28ELBNrEKwrXPKfnlvO2n6GJBUsc",
    "DANIEL PEREIRA.csv": "1ONf6ybHH21745CoU7d4rkxux8S-X293I",
    "EDUARDO COSTA.csv": "1K8yDW8IgE9lmNIhjx6kDHtQlpGuPnE9Y",
    "FABIO SANTOS.csv": "1W9ZREjNP7rGUSq_afY4FOGkPi4qnFu2l",
    "FELIPE RIBEIRO.csv": "1xtjQZfM1mm-h-8r59BaYeU1ytIco1qn2",
    "GABRIELA MARTINS.csv": "1Z3lsmgQWvhXacVqoo4_RTu1csgsGchqq",
    "GISELLE CARVALHO.csv": "1Fi0liE_RzZxojeG6lOksRSrXylRTxYcb",
    "HENRIQUE ALVES.csv": "1jYPFpC77-YhsJ9-9O8LsEplmRqVo3njx",
    "LUCAS MEDONCA.csv": "1Gmi9msjaCgafnT192b0iAwSK431tBuvu",
    "MARCOS CAVALCANTI.csv": "1KByrwu118nY8MpxfmkJ4B9YotABSMjUr",
    "MARIA VALENTINA.csv": "1v3FnLBs3eApyrzgz5-yBklQhBDeiHvjF",
    "PAULO MOURA.csv": "1a48KxBFtYFN7Vk2SiH1zPIBu6oQB2gpi",
    "RAFAEL SANTOS.csv": "1LTiibgfiJwLASJPSH1IP-zr1R8xQOwZ8",
    "RAUL MARTINS.csv": "1KQizt23RI60jROxB3ulAJhMXIGppiID-",
    "RICARDO BARBOSA.csv": "1_f3UhmKxFg2JQVLNX3OxSQ9QsdcQYS2h",
    "RODRIGO PINHEIRO.csv": "1uYUnE6U-ltIn2zjIlQNKfHnZd4t9fpaH",
    "ROMARIO SILVA.csv": "1sLMnHoDqbW38-EHJNi2wzwi8G2UbWZhT",
    "THIAGO FERNANDES.csv": "1lEx6o_BLpj-1hlGAR91X75kZQa-PyW5O",
    "VICTOR OLIVEIRA.csv": "1a5NcRyHngdjYRfdDqL3OyVHwDQ_wcLUW",
}

OUTPUT_DIR = "/app/data/ais"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def download_from_gdrive(file_id, output_path):
    """Download do Google Drive"""
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    
    try:
        filename = os.path.basename(output_path)
        print(f"📥 Baixando {filename}...", end=" ", flush=True, file=sys.stderr)
        
        session = requests.Session()
        response = session.get(url, stream=True, timeout=30)
        
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print("✅", file=sys.stderr)
            return True
        else:
            print(f"❌ (HTTP {response.status_code})", file=sys.stderr)
            return False
    except Exception as e:
        print(f"❌ Erro: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    print("╔════════════════════════════════════════════╗", file=sys.stderr)
    print("║  📥 Download AIS - Transpetro            ║", file=sys.stderr)
    print("╚════════════════════════════════════════════╝\n", file=sys.stderr)
    
    success = 0
    for filename, file_id in FILES.items():
        output_path = os.path.join(OUTPUT_DIR, filename)
        if os.path.exists(output_path):
            print(f"⏭️  {filename} já existe", file=sys.stderr)
            success += 1
        else:
            if download_from_gdrive(file_id, output_path):
                success += 1
    
    print(f"\n✅ {success}/{len(FILES)} arquivos\n", file=sys.stderr)
