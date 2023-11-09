import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TextInput,
  Picker,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function ProfessionalScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCPF] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState('Formação Acadêmica');
  const [especializacao, setEspecializacao] = useState('Especialização');
  const [crp, setCRP] = useState('');
  const [rua, setRua] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCEP] = useState('');

  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/mongodb-data/')
      .then((response) => response.json())
      .then((data) => setProfissionais(data))
      .catch((error) => console.error('Erro ao carregar os profissionais:', error));
  }, []);

  const handleSubmit = () => {
    const profissionalData = {
      nome,
      dataNascimento,
      cpf,
      formacaoAcademica,
      especializacao,
      crp,
      rua,
      numeroCasa,
      bairro,
      cidade,
      cep,
    };

    fetch('http://localhost:3000/api/mongodb-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profissionalData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Profissional criado:', data);

        setProfissionais([...profissionais, data]);

        setNome('');
        setDataNascimento('');
        setCPF('');
        setFormacaoAcademica('Formação Acadêmica');
        setEspecializacao('Especialização');
        setCRP('');
        setRua('');
        setNumeroCasa('');
        setBairro('');
        setCidade('');
        setCEP('');

        toggleModal();
      })
      .catch((error) => {
        console.error('Erro ao criar o profissional:', error);
      });
  };

  const formatCPF = (text) => {
    let formattedCPF = text.replace(/\D/g, '');

    if (formattedCPF.length > 3) {
      formattedCPF = formattedCPF.substring(0, 3) + '.' + formattedCPF.substring(3);
    }
    if (formattedCPF.length > 7) {
      formattedCPF = formattedCPF.substring(0, 7) + '.' + formattedCPF.substring(7);
    }
    if (formattedCPF.length > 11) {
      formattedCPF = formattedCPF.substring(0, 11) + '-' + formattedCPF.substring(11);
    }

    setCPF(formattedCPF);
  };

  const formatDataNascimento = (text) => {
    let formattedDataNascimento = text.replace(/\D/g, '');

    if (formattedDataNascimento.length > 2) {
      formattedDataNascimento = formattedDataNascimento.substring(0, 2) + '/' + formattedDataNascimento.substring(2);
    }
    if (formattedDataNascimento.length > 5) {
      formattedDataNascimento = formattedDataNascimento.substring(0, 5) + '/' + formattedDataNascimento.substring(5);
    }

    setDataNascimento(formattedDataNascimento);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profissionais</Text>
  
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
  
      <FlatList
        data={profissionais}
        keyExtractor={(item) => "" + item._id}
        renderItem={({ item }) => (
          <View style={styles.professionalItem}>
            <Image source={{ uri: item.foto }} style={styles.professionalPhoto} />

            <View style={styles.professionalDetails}>
              <View>
                <Text style={styles.professionalName}>{item.nome}</Text>
                <Text style={styles.professionalEmail}>{item.email}</Text>
              </View>

              <View>
                <Text style={styles.professionalFormacao}>{item.formacaoAcademica}</Text>
                <Text style={styles.professionalCRP}>{item.crp}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Icon name="chevron-left" size={30} color="black" />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Formulário de Profissional</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              value={nome}
              onChangeText={(text) => setNome(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento"
              value={dataNascimento}
              onChangeText={(text) => formatDataNascimento(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={(text) => formatCPF(text)}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={formacaoAcademica}
              onValueChange={(itemValue) => setFormacaoAcademica(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Formação Acadêmica" value="Formação Acadêmica" />
              <Picker.Item label="Opção 1" value="Opção 1" />
              <Picker.Item label="Opção 2" value="Opção 2" />
            </Picker>
            <Picker
              selectedValue={especializacao}
              onValueChange={(itemValue) => setEspecializacao(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Especialização" value="Especialização" />
              <Picker.Item label="Opção 1" value="Opção 1" />
              <Picker.Item label="Opção 2" value="Opção 2" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="CRP"
              value={crp}
              onChangeText={(text) => setCRP(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Rua"
              value={rua}
              onChangeText={(text) => setRua(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número da Casa"
              value={numeroCasa}
              onChangeText={(text) => setNumeroCasa(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              value={bairro}
              onChangeText={(text) => setBairro(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={cidade}
              onChangeText={(text) => setCidade(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="CEP"
              value={cep}
              onChangeText={(text) => setCEP(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#FF914D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  professionalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
    height: 70,
    marginBottom: 15,
    borderRadius: 6,
  },
  professionalPhoto: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 16,
    backgroundColor: 'red',
  },
  professionalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '500',
  },
  professionalEmail: {
    fontSize: 14,
  },
  professionalFormacao: {
    fontSize: 14,
    fontWeight: '500',
  },
  professionalCRP: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 0,
    width: '100%',
    maxHeight: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF743D',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    marginRight: 10,
    marginBottom: 15,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfessionalScreen;
