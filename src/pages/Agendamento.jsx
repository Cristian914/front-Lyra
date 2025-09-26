import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell, User, FileText, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { CampoDeDescricao } from '../components/CampoDeDescricao';
import { ConfirmationModal } from '../components/ConfirmationModal';

export const Agendamento = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedPsychologist, setSelectedPsychologist] = useState('');
  const [psychologists, setPsychologists] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [requestData, setRequestData] = useState({
    description: '',
    urgency: 'media'
  });

  const [modalVisible, setModalVisible] = useState(false);

  // frases de apoio
  const supportPhrases = [
    "Dar o primeiro passo já é um ato de coragem 💙",
    "Sua saúde mental é prioridade ✨",
    "Você não está sozinho nessa jornada 🤝",
    "Estamos aqui para apoiar você, sem julgamentos 🌿"
  ];
  const randomPhrase =
    supportPhrases[Math.floor(Math.random() * supportPhrases.length)];

  useEffect(() => {
    loadPsychologists();
  }, []);

  const loadPsychologists = async () => {
    try {
      const data = await mockApi.getPsychologists();
      setPsychologists(
        data.map(p => ({
          ...p,
          photo: p.photo || '/default-psych.png',
          bio: p.bio || 'Psicólogo(a) especializado(a) em saúde mental e bem-estar.'
        }))
      );
    } catch {
      toast.error('Erro ao carregar psicólogos');
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!selectedPsychologist || !requestData.description) {
      toast.error('Selecione um psicólogo e descreva sua necessidade');
      return;
    }
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    setSubmitting(true);
    try {
      await mockApi.createRequest({
        patientName: user.name,
        patientEmail: user.email,
        patientPhone: user.phone || '(11) 99999-9999',
        preferredPsychologist: parseInt(selectedPsychologist),
        description: requestData.description,
        urgency: requestData.urgency
      });
      toast.success('Solicitação enviada com sucesso!');
      navigate('/dashboard');
    } catch {
      toast.error('Erro ao enviar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => setModalVisible(false);

  const urgencyBadge = {
    baixa: 'bg-green-100 text-green-700',
    media: 'bg-yellow-100 text-yellow-700',
    alta: 'bg-red-100 text-red-700'
  };

  const selectedPsych = psychologists.find(
    p => p.id === parseInt(selectedPsychologist)
  );

  // sugestões rápidas de necessidade
  const quickSuggestions = [
    "Ansiedade",
    "Depressão",
    "Estresse no trabalho",
    "Problemas de relacionamento",
    "Autoestima baixa"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center  from-sky-500 to-indigo-600 p-6">
      <div className="max-w-2xl w-full space-y-6 animate-fadeInUp">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Solicitar ser Paciente</h1>
          <p className="text-white/80">
            Escolha um psicólogo e descreva sua necessidade de atendimento
          </p>
        </div>

        <Card className="shadow-xl backdrop-blur-md">
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            {/* Escolha psicólogo */}
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
                <User className="w-5 h-5 text-sky-600" />
                Escolha o Psicólogo
              </label>
              <select
                value={selectedPsychologist}
                onChange={(e) => setSelectedPsychologist(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              >
                <option value="">Selecione um psicólogo</option>
                {psychologists.map(psych => (
                  <option key={psych.id} value={psych.id}>
                    {psych.name} - {psych.specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Info do psicólogo */}
            {selectedPsych && (
              <div className="flex items-center gap-4 p-4 bg-sky-50 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                <img
                  src={selectedPsych.photo}
                  alt={selectedPsych.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sky-800">{selectedPsych.name}</h3>
                  <p className="text-sm text-gray-600">{selectedPsych.specialty}</p>
                  <p className="text-xs text-gray-500">{selectedPsych.bio}</p>
                </div>
              </div>
            )}

            {/* Descrição */}
            <div>
            
              <CampoDeDescricao
                valor={requestData.description}
                onChange={(novoValor) =>
                  setRequestData({ ...requestData, description: novoValor })
                }
              />
              {/* Sugestões rápidas */}
              <div className="flex flex-wrap gap-2 mt-2">
                {quickSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setRequestData({ ...requestData, description: sug })
                    }
                    className="px-3 py-1 text-sm bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgência */}
            <div>
              <label className="flex items-center gap-2 text-lg font-medium text-dark mb-3">
                <Zap className="w-5 h-5 text-sky-600" />
                Nível de Urgência
              </label>
              <select
                value={requestData.urgency}
                onChange={(e) =>
                  setRequestData({ ...requestData, urgency: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="baixa">Baixa - Posso aguardar</option>
                <option value="media">Média - Prefiro em breve</option>
                <option value="alta">Alta - Preciso urgentemente</option>
              </select>
            </div>

            {/* Frase de apoio dinâmica */}
            <p className="text-center text-sm text-gray-500 italic">
              {randomPhrase}
            </p>

            {/* Botões */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={submitting}
                className="flex-1 hover:scale-[1.02] transition-transform"
                disabled={!selectedPsychologist || !requestData.description}
              >
                Enviar Solicitação
              </Button>
            </div>
          </form>
        </Card>

        {/* Modal com resumo */}
        <ConfirmationModal
          visible={modalVisible}
          message={
            <div className="space-y-3 text-left">
              <p><strong>👤 Psicólogo:</strong> {selectedPsych?.name}</p>
              <p><strong>📌 Especialidade:</strong> {selectedPsych?.specialty}</p>
              <p><strong>📝 Descrição:</strong> {requestData.description}</p>
              <p>
                <strong>⚡ Urgência:</strong>{' '}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyBadge[requestData.urgency]}`}
                >
                  {requestData.urgency.toUpperCase()}
                </span>
              </p>
            </div>
          }
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};
