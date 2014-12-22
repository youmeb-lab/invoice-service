export YMIS_IMAGE = youmeb/invoice-service
export YMIS_CONTAINER_NAME_PREFIX = ymis_

start:
	@./tools/start.sh

stop:
	@./tools/stop.sh

ps:
	@./tools/list.sh

bash:
	@docker run --rm -it -v $(shell pwd)/app:/app $(YMIS_IMAGE) bash
