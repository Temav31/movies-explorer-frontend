import React from "react";
import popupImageClose from '../../images/close.svg';
import successImage from '../../images/Successfully.png';
import failedImage from '../../images/Failed.png';
// стили
import '../InfoTooltip/InfoTooltip.css';
// компонент для папапа с картинкой
function InfoTooltip(props) {
	const { isOpen, onClose, result } = props;
	// надпись успешного или неуспешного входа
	const textImage = result.length === 0 ? 'Профиль обновлён' : result;
	// картинка
	const image = result.length === 0  ? successImage : failedImage;
	
	return (
		<div className={`popup popup_type_info` + (isOpen && " popup_open")}>
			<div className="popup__elements">
				<button type="reset" className=" popup__close">
					<img
						src={popupImageClose}
						alt="Значок закрытия окна"
						className="popup__button-close"
						onClick={onClose}
					/>
				</button>
				<div className="popup__container">
					<img className="popup__info-image" src={image} alt={textImage} />
					<p className="text-group popup__info-text">{textImage}</p>
				</div>
			</div>
		</div>
	)
}
export default InfoTooltip;
