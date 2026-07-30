import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useUpdateCarMutation } from '../../api/garageApi';
import { setEditForm, clearSelection } from './garageSlice';
import { NAME_MAX_LENGTH } from '../../constants';

function UpdateCarForm() {
  const dispatch = useAppDispatch();
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);
  const { name, color } = useAppSelector((state) => state.garage.editForm);
  const [updateCar, { isLoading }] = useUpdateCarMutation();

  const isDisabled = selectedCarId === null;

  const handleUpdate = async () => {
    if (selectedCarId === null) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    await updateCar({ id: selectedCarId, body: { name: trimmed, color } });
    dispatch(clearSelection());
  };

  return (
    <div className="update-form">
      <input
        type="text"
        value={name}
        maxLength={NAME_MAX_LENGTH}
        placeholder="Car name"
        disabled={isDisabled}
        onChange={(e) => dispatch(setEditForm({ name: e.target.value }))}
      />
      <input
        type="color"
        value={color}
        disabled={isDisabled}
        onChange={(e) => dispatch(setEditForm({ color: e.target.value }))}
      />
      <button type="button" onClick={handleUpdate} disabled={isDisabled || isLoading}>
        Update
      </button>
    </div>
  );
}

export default UpdateCarForm;
