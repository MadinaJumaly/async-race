import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCreateCarMutation } from '../../api/garageApi';
import { setCreateForm, resetCreateForm } from './garageSlice';
import { NAME_MAX_LENGTH } from '../../constants';

function CreateCarForm() {
  const dispatch = useAppDispatch();
  const { name, color } = useAppSelector((state) => state.garage.createForm);
  const [createCar, { isLoading }] = useCreateCarMutation();

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    await createCar({ name: trimmed, color });
    dispatch(resetCreateForm());
  };

  return (
    <div className="create-form">
      <input
        type="text"
        value={name}
        maxLength={NAME_MAX_LENGTH}
        placeholder="Car name"
        onChange={(e) => dispatch(setCreateForm({ name: e.target.value }))}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => dispatch(setCreateForm({ color: e.target.value }))}
      />
      <button type="button" onClick={handleCreate} disabled={isLoading}>
        Create
      </button>
    </div>
  );
}

export default CreateCarForm;
