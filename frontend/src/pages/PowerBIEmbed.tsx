import { useEffect, useState } from 'react';

interface PowerBIConfig {
  reportUrl?: string;
  fileUrl?: string;
}

export default function PowerBIEmbed({ fileUrl }: PowerBIConfig) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      padding: '24px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginTop: '24px'
    }}>
      <h2 style={{ marginBottom: '16px', color: '#134252' }}>📊 Análises - Power BI</h2>
      
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#c00',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #ddd',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
              Carregando análises...
            </p>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e0e0e0',
              borderTop: '4px solid rgb(33, 128, 141)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : fileUrl ? (
          <div style={{ 
            width: '100%', 
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(33, 128, 141, 0.1)',
              padding: '30px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <p style={{ color: '#134252', marginBottom: '12px' }}>
                📁 Arquivo Power BI disponível
              </p>
              <a 
                href={fileUrl}
                download="transpetro.pbix"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgb(33, 128, 141)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(29, 116, 128)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(33, 128, 141)';
                }}
              >
                ⬇️ Baixar transpetro.pbix
              </a>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '12px' }}>
                Abra em Power BI Desktop para análises completas
              </p>
            </div>

            {/* Alternativa: Mostrar embed se o arquivo puder ser previsualizador */}
            <iframe
              src={fileUrl}
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
                borderRadius: '8px',
                display: 'none' // Oculto por enquanto, pois .pbix não é embutível direto
              }}
              title="Power BI Report"
              allowFullScreen={true}
            />
          </div>
        ) : (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#666'
          }}>
            <p>📭 Nenhum arquivo Power BI configurado</p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              Adicione um arquivo .pbix ou link do Power BI Service
            </p>
          </div>
        )}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(33, 128, 141, 0.05)',
        borderRadius: '8px',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>ℹ️ Nota:</strong> Arquivos .pbix precisam ser abertos no Power BI Desktop. 
        Para análises web, considere publicar no Power BI Service.
      </div>
    </div>
  );
}
