import { Check, Pencil, Trash2, X } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { subjects as initialSubjects } from '../../data/mockData';
import { colors, fonts, spacing } from '../../theme/colors';
import { commonStyles } from '../../theme/styles';

export default function SubjectsScreen() {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [subjectName, setSubjectName] = useState('');
  const [subjectColor, setSubjectColor] = useState('#FFD6E5');

  const [editingSubject, setEditingSubject] = useState(null); 

  const [isColorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState(subjectColor);
  const [colorTarget, setColorTarget] = useState(null); 
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const touchableRefs = useRef({});

  const openColorPicker = (target, initialColor, ref) => {
    ref.current.measure((fx, fy, width, height, px, py) => {
      setPopoverPosition({ top: py + height + 5, left: px });
      setColorTarget(target);
      setCurrentColor(initialColor);
      setColorPickerVisible(true);
    });
  };

  const handleConfirmColor = () => {
    if (colorTarget === 'add') {
      setSubjectColor(currentColor);
    } else if (colorTarget === 'edit') {
       setEditingSubject({ ...editingSubject, color: currentColor });
    }
    setColorPickerVisible(false);
  };
  
  const handleEditPress = (subject) => {
    setEditingSubject({ ...subject }); 
  };

  const handleUpdateSubject = () => {
    setSubjects(currentSubjects => 
        currentSubjects.map(s => (s.id === editingSubject.id ? editingSubject : s))
    );
    setEditingSubject(null);
  };

  const handleCancelEdit = () => {
    setEditingSubject(null);
  };

  const handleDeletePress = (subjectIdToDelete) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta matéria?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {

            setSubjects(currentSubjects => 
              currentSubjects.filter(subject => subject.id !== subjectIdToDelete)
            );
          },
        },
      ]
    );
  };
  
  const handleAddSubject = () => {
    if (subjectName.trim() === '') {
      Alert.alert('Erro', 'O nome da matéria não pode ser vazio.');
      return;
    }
    const newSubject = { id: Date.now().toString(), name: subjectName, hours: 0, color: subjectColor, priority: 'Normal' };
    setSubjects(currentSubjects => [newSubject, ...currentSubjects]);
    setSubjectName('');
  };

  const renderSubjectItem = ({ item }) => {
    const isEditing = editingSubject && editingSubject.id === item.id;
    touchableRefs.current[item.id] = touchableRefs.current[item.id] || React.createRef();

    if (isEditing) {
      return (
        <Card style={[styles.subjectCard, { backgroundColor: editingSubject.color }]}>
          <View style={styles.subjectInfo}>
            <TextInput style={styles.editInput} value={editingSubject.name} onChangeText={(text) => setEditingSubject({...editingSubject, name: text})} autoFocus />
            <TouchableOpacity ref={touchableRefs.current[item.id]} onPress={() => openColorPicker('edit', editingSubject.color, touchableRefs.current[item.id])}>
              <Text style={styles.changeColorText}>Alterar cor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subjectActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleUpdateSubject}><Check size={24} color="green" /></TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCancelEdit}><X size={24} color={colors.red} /></TouchableOpacity>
          </View>
        </Card>
      );
    }

    return (
      <Card style={[styles.subjectCard, { backgroundColor: item.color }]}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{item.name}</Text>
          <Text style={styles.subjectHours}>{item.hours}H estudadas</Text>
        </View>
        <View style={styles.subjectActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleEditPress(item)}><Pencil size={20} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleDeletePress(item.id)}><Trash2 size={20} color={colors.red} /></TouchableOpacity>
        </View>
      </Card>
    );
  };
  
  const addColorRef = React.createRef();

  return (
    <View style={commonStyles.container}>
      <Header showBackButton showProgress currentStep={3} totalSteps={5} />
      <ScrollView style={commonStyles.screenPadding} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Minhas Matérias</Text>
        <Text style={styles.subtitle}>Gerencie suas disciplinas de estudo.</Text>

        <Card>
          <Text style={styles.cardTitle}>Adicionar Matéria</Text>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} placeholder="Digite o nome da matéria" value={subjectName} onChangeText={setSubjectName} />
          <Text style={styles.label}>Cor</Text>
          <TouchableOpacity ref={addColorRef} style={styles.colorPreviewTouchable} onPress={() => openColorPicker('add', subjectColor, addColorRef)}>
            <View style={[styles.colorPreview, { backgroundColor: subjectColor }]} />
            <Text style={styles.colorValueText}>{subjectColor.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}><Text style={styles.addButtonText}>Adicionar</Text></TouchableOpacity>
        </Card>

        <FlatList data={subjects} keyExtractor={(item) => item.id} scrollEnabled={false} renderItem={renderSubjectItem} />
        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <Modal visible={isColorPickerVisible} transparent={true} animationType="fade" onRequestClose={() => setColorPickerVisible(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setColorPickerVisible(false)} />
        <View style={[styles.popoverContainer, popoverPosition]}>
          <View style={styles.colorPickerWrapper}>
            <ColorPicker color={currentColor} onColorChange={setCurrentColor} thumbSize={25} sliderSize={25} noSnap={true} row={false} swatches={false} />
          </View>
           <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmColor}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    title: { fontSize: fonts.titleSize, fontWeight: '600', color: colors.primaryText, marginBottom: spacing.xs, },
    subtitle: { fontSize: fonts.bodySize, color: colors.secondaryText, marginBottom: spacing.md, },
    cardTitle: { fontSize: fonts.subtitleSize, fontWeight: '600', color: colors.primaryText, marginBottom: spacing.md, },
    label: { fontSize: fonts.bodySize, color: colors.primaryText, marginBottom: spacing.xs, fontWeight: '500', marginTop: spacing.sm, },
    input: { borderWidth: 1, borderColor: colors.gray, borderRadius: 8, padding: spacing.sm, fontSize: fonts.bodySize, color: colors.primaryText, backgroundColor: colors.white, },
    addButton: { backgroundColor: colors.accent, padding: spacing.sm, borderRadius: 8, alignItems: 'center', marginTop: spacing.md, },
    addButtonText: { color: colors.white, fontWeight: '600', fontSize: fonts.subtitleSize, },
    subjectCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    subjectInfo: { flex: 1, },
    subjectName: { fontSize: fonts.subtitleSize, fontWeight: '600', color: colors.primaryText, marginBottom: spacing.xs, },
    subjectHours: { fontSize: fonts.bodySize, color: colors.secondaryText, },
    subjectActions: { flexDirection: 'row', gap: spacing.sm, },
    actionButton: { padding: spacing.xs, },
    editInput: { backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 6, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, fontSize: fonts.subtitleSize, fontWeight: '600', marginBottom: spacing.sm, },
    changeColorText: { color: colors.primaryText, fontWeight: '500', textDecorationLine: 'underline', },
    colorPreviewTouchable: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, borderWidth: 1, borderColor: colors.gray, borderRadius: 8, padding: spacing.xs, marginTop: spacing.xs, },
    colorPreview: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: colors.gray, },
    colorValueText: { fontSize: fonts.bodySize, color: colors.secondaryText, },
    popoverContainer: { position: 'absolute', backgroundColor: 'white', borderRadius: 12, padding: spacing.md, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, gap: spacing.sm, },
    colorPickerWrapper: { height: 250, width: 250, },
    confirmButton: { backgroundColor: colors.accent, paddingVertical: spacing.xs, borderRadius: 8, alignItems: 'center', },
    confirmButtonText: { color: colors.white, fontWeight: 'bold', },
});