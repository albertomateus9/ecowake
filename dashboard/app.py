import dash
from dash import dcc, html, Input, Output, callback
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import requests
from datetime import datetime
import json

# Configuração
API_URL = "http://backend:8000/api"

# Inicializar app Dash
app = dash.Dash(
    __name__,
    meta_tags=[{"name": "viewport", "content": "width=device-width, initial-scale=1"}]
)

# CSS customizado
app.index_string = '''
<!DOCTYPE html>
<html>
<head>
    {%metas%}
    <title>EcoWake Dashboard</title>
    {%favicon%}
    {%css%}
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
        }
        #react-entry-point {
            background: #f5f7fa;
        }
    </style>
</head>
<body>
    {%app_entry%}
    <footer>
        {%config%}
        {%scripts%}
        {%renderer%}
    </footer>
</body>
</html>
'''

# Layout principal
app.layout = html.Div([
    # Header
    html.Div([
        html.Div([
            html.Img(src="/assets/logo.png", style={"height": 50}),
            html.H1("🌊 EcoWake", style={"display": "inline", "marginLeft": 20})
        ], style={"display": "flex", "alignItems": "center"}),
        html.P("Sistema de Monitoramento de Bioincrustação - Frota Transpetro")
    ], style={
        "background": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "color": "white",
        "padding": "20px",
        "marginBottom": 20,
        "borderRadius": "10px 10px 0 0"
    }),

    # Filtros
    html.Div([
        html.Div([
            html.Label("Filtrar por Status:"),
            dcc.Dropdown(
                id='status-filter',
                options=[
                    {'label': 'Todos', 'value': 'all'},
                    {'label': 'Operando', 'value': 'Operando'},
                    {'label': 'Manutenção', 'value': 'Manutenção'},
                    {'label': 'Parado', 'value': 'Parado'},
                ],
                value='all',
                style={"width": "100%"}
            )
        ], style={"flex": 1, "marginRight": 20}),

        html.Div([
            html.Label("Filtrar por Bioincrustação:"),
            dcc.RangeSlider(
                id='biofouling-slider',
                min=0, max=4, step=1,
                marks={i: str(i) for i in range(5)},
                value=[0, 4],
                tooltip={"placement": "bottom", "always_visible": True}
            )
        ], style={"flex": 2}),
    ], style={
        "display": "flex",
        "marginBottom": 20,
        "background": "white",
        "padding": 20,
        "borderRadius": 10
    }),

    # Métricas
    html.Div(id='metrics-container', style={
        "display": "grid",
        "gridTemplateColumns": "repeat(auto-fit, minmax(200px, 1fr))",
        "gap": 20,
        "marginBottom": 20
    }),

    # Gráficos
    html.Div([
        html.Div([
            dcc.Graph(id='biofouling-chart')
        ], style={"flex": 1}),
        html.Div([
            dcc.Graph(id='status-chart')
        ], style={"flex": 1}),
    ], style={"display": "flex", "gap": 20, "marginBottom": 20}),

    # Consumo de combustível
    html.Div([
        dcc.Graph(id='fuel-chart')
    ], style={"background": "white", "padding": 20, "borderRadius": 10, "marginBottom": 20}),

    # Tabela de dados
    html.Div([
        html.H3("📊 Detalhes dos Navios"),
        html.Div(id='ships-table')
    ], style={"background": "white", "padding": 20, "borderRadius": 10}),

    # Auto-refresh
    dcc.Interval(id='interval-component', interval=30000, n_intervals=0)

], style={"padding": 20, "maxWidth": 1400, "margin": "0 auto"})

# Callbacks
@callback(
    [Output('metrics-container', 'children'),
     Output('biofouling-chart', 'figure'),
     Output('status-chart', 'figure'),
     Output('fuel-chart', 'figure'),
     Output('ships-table', 'children')],
    [Input('status-filter', 'value'),
     Input('biofouling-slider', 'value'),
     Input('interval-component', 'n_intervals')]
)
def update_dashboard(selected_status, biofouling_range, n):
    try:
        response = requests.get(f"{API_URL}/ships")
        ships = response.json()["ships"]
        df = pd.DataFrame(ships)
        
        # Filtrar
        if selected_status != 'all':
            df = df[df['status'] == selected_status]
        df = df[(df['biofouling_level'] >= biofouling_range[0]) & 
                (df['biofouling_level'] <= biofouling_range[1])]
        
        # Métricas
        metrics = html.Div([
            html.Div([
                html.H4(len(df)),
                html.P("Total de Navios")
            ], className="metric-card"),
            html.Div([
                html.H4(len(df[df['biofouling_level'] >= 3])),
                html.P("Em Risco")
            ], className="metric-card"),
            html.Div([
                html.H4(f"{df['fuel_consumption'].mean():.1f} t/dia"),
                html.P("Consumo Médio")
            ], className="metric-card"),
            html.Div([
                html.H4(f"{df['speed'].mean():.1f} nós"),
                html.P("Velocidade Média")
            ], className="metric-card"),
        ], style={"display": "grid", "gridTemplateColumns": "repeat(4, 1fr)", "gap": 15})
        
        # Gráficos
        biofouling_fig = px.bar(
            df, x='name', y='biofouling_level', color='biofouling_level',
            color_continuous_scale='RdYlGn_r', title='Níveis de Bioincrustação'
        )
        
        status_fig = px.pie(
            df, names='status', title='Distribuição de Status',
            color_discrete_sequence=['#667eea', '#764ba2', '#f093fb']
        )
        
        fuel_fig = px.bar(
            df, x='name', y='fuel_consumption', color='fuel_consumption',
            color_continuous_scale='Viridis', title='Consumo de Combustível'
        )
        
        # Tabela
        table = html.Table([
            html.Thead(
                html.Tr([
                    html.Th("Navio"),
                    html.Th("Status"),
                    html.Th("Bioincrustação"),
                    html.Th("Velocidade (nós)"),
                    html.Th("Consumo (t/dia)"),
                ])
            ),
            html.Tbody([
                html.Tr([
                    html.Td(row['name']),
                    html.Td(row['status']),
                    html.Td(f"{row['biofouling_level']}/4"),
                    html.Td(f"{row['speed']:.1f}"),
                    html.Td(f"{row['fuel_consumption']:.1f}"),
                ]) for _, row in df.iterrows()
            ])
        ], style={
            "width": "100%",
            "borderCollapse": "collapse",
            "textAlign": "center"
        })
        
        return metrics, biofouling_fig, status_fig, fuel_fig, table
    
    except Exception as e:
        print(f"Erro: {e}")
        return html.Div("Erro ao carregar dados"), {}, {}, {}, html.Div("Erro")

if __name__ == '__main__':
    app.run_server(host='0.0.0.0', port=8050, debug=False)
